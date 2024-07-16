let Xterm = document.getElementById('terminal');

async function sending(sock, input, terminal) {
    await new Promise(resolve => {
        sock.send(input); // Send the command to the server

        // Wait for the response from the server
        sock.onmessage = (event) => {
            terminal.write(event.data); // Write the server's response to the terminal
            terminal.write('$ '); // Write $ to the terminal after the output
            resolve(); // Resolve the promise once response handling is done
        };
    });
}

// Create a new terminal instance
var term = new Terminal({
    convertEol: true
});
term.open(Xterm);
term.write('$ ');

// Make connection to the server
// TODO: Change the IP address to your server IP address or the domain name
// Example: https://John.com:3000
const socket = new WebSocket('ws://34.207.190.242:3000');

// Using
term.onKey(e => {
    const { key, domEvent } = e;
    const printable = (
        !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey
    );

    if (domEvent.keyCode === 13) { // Enter
        const input = term.buffer.active.getLine(term.buffer.active.cursorY).translateToString().slice(1); // Extract command text
        term.write('\r\n');
        sending(socket, input, term); // Send command to server
    } else if (domEvent.keyCode === 8) { // Backspace
        if (term.buffer.active.cursorX > 2) {
            term.write('\b \b');
        }
    } else if (printable) {
        term.write(key);
    }
});

socket.onmessage = (event) => {
    term.write(event.data);
};

term.focus();
