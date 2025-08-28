---

# 🚀 Project Documentation: Microservices Deployment with Argo CD, Argo Rollouts, and AWS ECR

This project demonstrates how to deploy microservices into a Kubernetes cluster (Minikube) using **Argo CD** for GitOps-based delivery, **Argo Rollouts** for progressive delivery strategies, and **AWS ECR (Public/Private)** as the Helm chart registry.

---

## **Step 1: Install Argo CD and Argo Rollouts**

### 1.1 Install Argo CD

Argo CD is installed in the `argocd` namespace.

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Verify:

```bash
kubectl get pods -n argocd
```

> All pods (argocd-server, repo-server, application-controller, redis, dex) should be in `Running` state.

---

T
### Install the Argo CD CLI:

For Linux:

```bash
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64
```

Verify installation:

```bash
argocd version
```

---

### Then list your applications:

```bash
argocd app list
```


---

### 1. Get the Argo CD server URL

Run:

```bash
kubectl get svc -n argocd
```

Look for `argocd-server`.
If using Minikube:

```bash
minikube service argocd-server -n argocd --url
```

This will give you something like:

```
http://192.168.49.2:30123
```

---

### 2. Log in to Argo CD

```bash
argocd login <ARGOCD_SERVER_URL> --username admin --password <PASSWORD> --insecure
```

If you don't know the password:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

---

### 3. List your applications

```bash
argocd app list
```

If your apps are in a different namespace (e.g., `ecommerce`), that’s okay — **`argocd app list` works cluster-wide by default**, the namespace in Argo CD refers to the control plane, not the app namespace.

---

---

### 1.2 Access Argo CD UI (in Minikube)

Expose Argo CD server:

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Now open: [https://localhost:8080](https://localhost:8080)

Login:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
```

Default username: `admin`
Password: (output from above)

---

### 1.3 Install Argo Rollouts

Argo Rollouts extends Kubernetes with advanced deployment strategies like **Canary** and **Blue-Green**.

```bash
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

Verify:

```bash
kubectl get pods -n argo-rollouts
```
sometimes you need to use the same link to install argo rollouts in the apps namespace


Install CLI for Rollouts:

```bash
curl -sLO https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-amd64
chmod +x ./kubectl-argo-rollouts-linux-amd64
sudo mv ./kubectl-argo-rollouts-linux-amd64 /usr/local/bin/kubectl-argo-rollouts
```

Check:

```bash
kubectl argo rollouts version
```

---
Perfect ✅
I’ll extend your documentation so it **flows naturally**:

1. Install Argo CD & Argo Rollouts
2. **Build & Push Docker Images (to Docker Hub)**
3. **Build & Push Helm Charts (to AWS ECR)**
4. Deploy via Argo CD

---

# 📘 Project Documentation

## **Step 1: Install Argo CD & Argo Rollouts**

* Install Argo CD on Kubernetes
* Install Argo Rollouts for progressive delivery
* Verify pods in `argocd` and `argo-rollouts` namespaces

---

## **Step 2: Build & Push Docker Images (to Docker Hub)**

Each microservice (`landing`, `cart`, `product`) has its own `Dockerfile`.

### 2.1 Build Docker Images

```bash
docker build -t <dockerhub-username>/landing:1.0.0 ./landing
docker build -t <dockerhub-username>/cart:1.0.0 ./cart
docker build -t <dockerhub-username>/product:1.0.0 ./product
```

### 2.2 Push Docker Images

```bash
docker login -u <dockerhub-username> -p <password>
docker push <dockerhub-username>/landing:1.0.0
docker push <dockerhub-username>/cart:1.0.0
docker push <dockerhub-username>/product:1.0.0
```

👉 These image tags (`landing:1.0.0`, etc.) will be referenced inside **Helm values.yaml**.

---

## **Step 3: Package Helm Charts & Push to AWS ECR**

### 3.1 Package Helm Charts

```bash
helm package ./ecommerce
```

### 3.2 Login to AWS ECR Public (Helm Registry)

```bash
aws ecr-public get-login-password --region us-east-1 \
  | helm registry login --username AWS --password-stdin public.ecr.aws
```

### 3.3 Push Helm Charts

```bash
helm push ./ecommerce-1.0.0.tgz oci://public.ecr.aws/<alias>/ecommerce
```

---

## **Step 4: Deploy via Argo CD**

1. Create a Kubernetes secret for AWS ECR authentication:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ecr-public-creds
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: repository
stringData:
  name: ecr-public
  type: helm
  url: oci://public.ecr.aws/<alias>/ecommerce
  username: AWS
  password: <your-ecr-login-password>  <-- token

```
get the toekn from "aws ecr-public get-login-password --region us-east-1  ---> run  this and copy the token and paste it in the secret"
Note: use crone jobs to update the secret with new token every 24 hours


2. Create the Argo CD Application:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ecommerce-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: oci://public.ecr.aws/<alias>/ecommerce
    chart: ecommerce
    targetRevision: ^1.0.0
    helm:
      values: |
        image:
          repository: <dockerhub-username>/landing
          tag: "1.0.0"
  destination:
    server: https://kubernetes.default.svc
    namespace: ecommerce
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

3. Apply the files:

```bash
kubectl apply -f secret.yaml
kubectl apply -f application.yaml
```

4. Argo CD pulls Helm chart → Helm chart references **Docker Hub images** → Microservices deployed in `ecommerce` namespace.

access it via

kubectl port-forward svc/istio-ingressgateway -n istio-system 8000:80

---
Extras adding rollouts in diffrent namespaces:


## **Option 1: Grant Access to Multiple Namespaces (Recommended)**

Instead of reinstalling, you can update the existing Argo Rollouts controller to **watch additional namespaces**.

### **Steps:**

1. **Edit the Argo Rollouts Deployment**
    
    ```bash
    kubectl edit deployment argo-rollouts -n <namespace-where-argo-is-installed>
    ```
    
2. **Set the Environment Variable for Watching Namespaces**  
    Find the container spec and add:
    
    ```yaml
    - name: ARGO_ROLLOUTS_NAMESPACES
      value: "default,istio-system,dev,staging"
    ```
    
    (Comma-separated list of namespaces you want it to watch)
    
3. **Update RBAC Permissions**
    
    - Grant `Role` and `RoleBinding` (or `ClusterRole` if you want cluster-wide) to the `argo-rollouts` service account in each namespace:
        
    
    ```bash
    kubectl create rolebinding argo-rollouts-rb \
      --clusterrole=argo-rollouts-clusterrole \
      --serviceaccount=<namespace-where-argo-is-installed>:argo-rollouts \
      -n istio-system
    ```
    
4. **Restart the Deployment**
    
    ```bash
    kubectl rollout restart deployment argo-rollouts -n <namespace-where-argo-is-installed>
    ```
    

---

## **Option 2: Install Argo Rollouts Separately in Each Namespace**

If you want **strict isolation**, install it multiple times:

```bash
kubectl create namespace istio-system
kubectl apply -n istio-system -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

Then each namespace has its own controller.

---

## **Which is Better?**

- **Option 1 (multi-namespace watch)**: Better for central management, less overhead.
    
- **Option 2 (per-namespace install)**: Better for isolated environments (e.g., different teams).
    

---

## **To Access Rollouts in Another Namespace**

After configuration:

```bash
kubectl argo rollouts list -n istio-system
```

or

```bash
kubectl argo rollouts dashboard -n istio-system
```

---
