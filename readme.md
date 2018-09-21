# Docker / Kubernetes demo

## Part 1
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

// Create a server with a host and port
const server = Hapi.server({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, h) {

        return `hello world from ${Package.name} version ${Package.version}`;
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
