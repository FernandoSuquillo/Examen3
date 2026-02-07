Write-Host "Cleaning up old deployments..."
kubectl delete -f k8s/ --ignore-not-found

Write-Host "Building Policies Service..."
cd policies-service
docker build -t policies-service:latest .
cd ..

Write-Host "Building Providers Service..."
cd providers-service
docker build -t providers-service:latest .
cd ..

Write-Host "Building Claims Service..."
cd claims-service
docker build -t claims-service:latest .
cd ..

Write-Host "Building Frontend..."
cd frontend
docker build -t frontend:latest .
cd ..

Write-Host "Deploying to Kubernetes..."
kubectl apply -f k8s/mysql-policies.yaml
kubectl apply -f k8s/postgres-providers.yaml
kubectl apply -f k8s/mysql-claims.yaml
kubectl apply -f k8s/policies-deployment.yaml
kubectl apply -f k8s/providers-deployment.yaml
kubectl apply -f k8s/claims-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

Write-Host "Deployment complete."
Write-Host "Frontend: http://localhost"
