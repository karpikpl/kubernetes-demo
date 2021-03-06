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

        console.log('Hello');
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
