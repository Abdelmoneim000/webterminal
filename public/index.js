let Xterm = document.getElementById('terminal');

var term = new Terminal({
    convertEol: true
});
term.open(Xterm);
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

const socket = new WebSocket('ws://34.207.190.242:3000');

term.onKey(e => {
    const { key, domEvent } = e;
    const printable = (
        !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey
    );

    if (domEvent.keyCode === 13) { // Enter
        const input = term.buffer.active.getLine(term.buffer.active.cursorY).translateToString().slice(2); // Extract command text
        term.write('\r\n');
        socket.send(input); // Send command to server
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
