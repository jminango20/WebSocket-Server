const WebSocket = require('ws');

function onError(ws, error) {
    console.log(`onError: ${error.mensage}`);
}

function onMessage(ws, message) {
    console.log(`onMessage: ${message}`);
    ws.send(message);
    ws.send("recebido");
}

function onConnection(ws, req) {
    ws.on('message', message => onMessage(ws, message));
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection: ${req.url}`);
}

module.exports = (server) => {
    const wss = new WebSocket.Server({server});
    wss.on('connection', onConnection);
    wss.broadcast = broadcast;

    console.log(`WebSocket Server is running on port ${server.address().port}`);
    return wss;
}

function broadcast(jsonObject) {
    if(!this.clients) return;
    this.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(jsonObject));
        }
    });
}