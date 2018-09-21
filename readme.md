# Docker / Kubernetes demo

## Part 1 - nodejs
1. Initialize
```
git init
yarn init
yarn add hapi
```

2. code
add `index.js` with
```
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
```
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
