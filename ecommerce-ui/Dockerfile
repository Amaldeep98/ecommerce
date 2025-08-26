

FROM node:18-alpine AS client-build 
WORKDIR /app/client 
COPY client/package*.json ./ 
RUN npm install --legacy-peer-deps
COPY client/ ./ 
RUN npm run build



FROM node:18-alpine AS server-build 
WORKDIR /app/server 
COPY server/package*.json ./ 
RUN npm install 
COPY server/ ./


FROM node:18-alpine 
WORKDIR /app

COPY --from=client-build /app/client/build ./client/build

COPY --from=server-build /app/server ./server

WORKDIR /app/server 

RUN npm install --only=production

EXPOSE 4000

WORKDIR /app/server

CMD ["node", "server.js"]