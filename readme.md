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
