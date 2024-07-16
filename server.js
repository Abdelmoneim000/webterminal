const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');
const env = require('dotenv');

env.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('A user connected');

    // Spawn a bash shell process
    const bash = spawn('bash');

    // Handle data from the bash shell's stdout
    bash.stdout.on('data', (data) => {
        ws.send(data.toString());
    });

    // Handle data from the bash shell's stderr
    bash.stderr.on('data', (data) => {
        ws.send(data.toString());
    });

    // Handle commands received from the client
    ws.on('message', (command) => {
        const commandString = command.toString().trim();
        console.log('Received command:', commandString);

        // Write the command to the bash shell's stdin
        bash.stdin.write(commandString + '\n');
    });

    // Handle the close event
    ws.on('close', () => {
        console.log('A user disconnected');
        bash.kill(); // Ensure the bash process is terminated when the WebSocket connection is closed
    });

    // Handle the exit of the bash shell process
    bash.on('close', (code) => {
        console.log(`Bash shell exited with code ${code}`);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

