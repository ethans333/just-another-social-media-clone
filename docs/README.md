# JASMC (Just Another Social Media Clone)

## Frontend 📷

<img src="images/ss-1.png" alt="Frontend Screenshot" width="700px" />
<img src="images/ss-2.png" alt="Frontend Screenshot" width="700px" />

## Testing Locally

### Running Frontend

In `/frontend`

```bash
npm run dev
```

Serving on `http://localhost:5173/`.

### Running Backend

In `/backend`

```bash
docker compose up --build
```

## Testing Cluster Locally with Minikube

### Setup

Start Minikube and configure aws credentials.

```bash
minikube start && \
eval $(minikube docker-env) \
kubectl create secret generic aws-creds \
  --from-literal=AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id) \
  --from-literal=AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
```

### Running

In `/`

```bash
minikube start && \
skaffold dev && \
xdg-open http://$(minikube ip)
```
