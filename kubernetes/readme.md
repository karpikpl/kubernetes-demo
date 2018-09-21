# Kubernetes dashboard
The Dashboard UI is not deployed by default. To deploy it, run the following command:
`kubectl create -f https://raw.githubusercontent.com/kubernetes/dashboard/master/src/deploy/recommended/kubernetes-dashboard.yaml`

see:
https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/#deploying-the-dashboard-ui

# Dashboard with minikube
It seems minikube comes with dashboard:
`minikube dashboard --url`
