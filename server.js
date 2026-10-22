const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('Bir cihaz bağlandı:', socket.id);

    // Konum verisini al ve diğer cihaza gönder
    socket.on('share-location', (data) => {
        socket.broadcast.emit('update-location', data);
    });

    socket.on('disconnect', () => {
        console.log('Cihaz ayrıldı:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
