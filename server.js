const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Client } = require('ssh2');
const env = require('dotenv')

env.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws) => {
    console.log('A user connected');

    // SSH connection configuration
    const sshConfig = {
        host: process.env.HOST,
        port: 22,
        username: process.env.USER,
        privateKey: require('fs').readFileSync('../private')
    };

    const conn = new Client();
    conn.on('ready', () => {
        console.log('SSH connection established');
        conn.shell((err, stream) => {
            if (err) throw err;

            stream.on('data', (data) => {
                ws.send(data.toString());
            });

            ws.on('message', (message) => {
                stream.write(message);
            });

            ws.on('close', () => {
                conn.end();
            });
        });
    }).connect(sshConfig);

    conn.on('error', (err) => {
        console.error('SSH connection error:', err);
        ws.close();
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
