# Docker / Kubernetes demo

## Part 1 - nodejs
1. Initialize
```bash
git init
yarn init
yarn add hapi
```

2. code
add `index.js` with
```js
'use strict';

const Hapi = require('hapi');
const Package = require('./package.json');
const os = require('os');

// Create a server with a host and port
const server = Hapi.server({
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, h) {

        return `hello world from ${Package.name} version ${Package.version} running on ${os.hostname()}`;
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
```

3. Start
Run `node index.js`

4. Call
`curl .:8000/hello`


## Part 2 - Docker
1. Add dockerfile
```dockerfile
FROM node:8

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

#RUN npm i yarn -g
RUN yarn

EXPOSE 8000
CMD [ "node", "index.js" ]
```

2. Build image
`docker build . -t devops-demo`

3. Run image
`docker run --rm --name devops -d -p 8000:8000 devops-demo`

## Part 3 Kubernetes
1. Start minikube
`minikube start`

2. Switch docker to minikube
`eval $(minikube docker-env)`

3. Build the image
`docker build . -t devops-demo`

4. Open dashboard
`minikube dashboard`

5. Deploy
`kubectl run devops --image=devops-demo --replicas=1 --port=8000 --image-pull-policy=Never`

6. View
`kubectl get deployments`
`kubectl describe deployment devops`

7. Create service
`kubectl expose deployment devops --type=LoadBalancer`

8. Expose service on minikube
`minikube service devops`

9. Get minikube IP and service port
```bash
export PORT=$(kubectl get svc devops -o go-template='{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}')
export MINIKUBE_IP=$(minikube ip)
```

10. Call your service
`curl $MINIKUBE_IP:$PORT/hello`

## Part 4 - updating running application
1. Modify `package.json` by changing the version
2. Build new docker image
`docker build . -t devops-demo:v2`
3. Update image of the running deployment
`kubectl set image deployments/devops devops=devops-demo:v2`
