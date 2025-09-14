const app = require('./app');
const appWs = require('./app-ws');

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${server.address().port}`);
})

const wss =appWs(server);

setInterval(() => {
    wss.broadcast({n: Math.random()});
    }, 1000);
