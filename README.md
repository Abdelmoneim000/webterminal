# Xterm web terminal

## Description:
This is a simple web terminal that uses xterm.js and node-pty to create a terminal emulator in the browser. You need experience working with websocket and express in node.js in order to work with this project.

## Installation:

### Requirements:
- Node.js
- npm

### How to install:
1. Clone the repository using `git clone https://github.com/Abdelmoneim000/webterminal.git`
2. navigate to the cloned repo using `cd webterminal`
3. Install the dependencies using `npm install`

## Start the webterminal
1. After running the back-end on specific port (example: 3000), open the index.html file in your browser from the `public` directory.

2. After opening the index.html file in your browser, you should see the `A user connected` message in your terminal which runs the back-end.

3. Every successful command received from the front-end will be printed in the terminal.

> [!NOTE]
> Right now, the terminal interface is not fully functional. You need to adjust its functionality inside the index.js file and use custom styling as needed.

> [!ATTENTION]
> Inside index.js file, line 26, you need to follow the comments to successfully send the command to the server.

## Contributors:

- [Abdelmoneim Ibrahim](https://github.com/Abdelmoneim000): Software Engineer and developer of this project.
- [Abhay Bhargav](https://replit.com/@AbhayBhargav1): Sponsor and owner of this project.
