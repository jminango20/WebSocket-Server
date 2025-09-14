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
    const wss = new WebSocket.Server({
        server,
        verifyClient
    });
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

function corsValidation(origin) {
    return process.env.CORS_ORIGIN === '*' || process.env.CORS_ORIGIN.startsWith(origin);
}

function verifyClient(info, callback) {
    if (!corsValidation(info.origin)) return callback(false);
    
    const token = info.req.url.split('token=')[1];
    return token === '123456' ? callback(true) : callback(false);
}