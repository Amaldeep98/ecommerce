
# 🚀 **Argo CD CLI Commands**

### 🔑 Login to Argo CD

```bash
argocd login <ARGOCD_SERVER> --username admin --password <password> --insecure
```

### 📂 Manage Applications

```bash
# List all applications
argocd app list

# Get details of the ecommerce app
argocd app get ecommerce-app

# Sync (deploy latest changes)
argocd app sync ecommerce-app

# Refresh application state
argocd app get ecommerce-app --refresh

# Delete application
argocd app delete ecommerce-app --cascade
```

### 🔄 Rollback / History

```bash
# Show sync history
argocd app history ecommerce-app

# Rollback to a previous revision
argocd app rollback ecommerce-app <REVISION>
```

### 🛠 Misc

```bash
# Logout
argocd logout <ARGOCD_SERVER>

# Check version
argocd version
```

---

# 🎯 **Argo Rollouts CLI Commands**

### 📋 Get Rollouts

```bash
# List all rollouts in ecommerce namespace
kubectl argo rollouts list rollouts -n ecommerce

# Get details of rollout
kubectl argo rollouts get rollout <rollout-name> -n ecommerce
```

### 🔄 Manage Rollouts

```bash
# Promote rollout to full
kubectl argo rollouts promote <rollout-name> -n ecommerce

# Abort current rollout
kubectl argo rollouts abort <rollout-name> -n ecommerce

# Retry rollout after fixing issue
kubectl argo rollouts retry <rollout-name> -n ecommerce
```

### 🔙 Rollback

```bash
# Rollback to previous version
kubectl argo rollouts undo <rollout-name> -n ecommerce

# Show rollout history
kubectl argo rollouts history <rollout-name> -n ecommerce
```

### 📊 Monitor

```bash
# Watch rollout status
kubectl argo rollouts get rollout <rollout-name> -n ecommerce --watch

# Show rollout status
kubectl argo rollouts status <rollout-name> -n ecommerce
```

---

# 🧹 Delete Resources

```bash
# Delete rollout
kubectl delete rollout <rollout-name> -n ecommerce

# Delete whole ecommerce namespace
kubectl delete ns ecommerce
```

---

