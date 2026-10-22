const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('Cihaz bağlandı:', socket.id);

    // Konum, pil ve hız verisini ilet
    socket.on('share-location', (data) => {
        socket.broadcast.emit('update-location', data);
    });

    // Sohbet mesajını ilet
    socket.on('send-message', (msg) => {
        socket.broadcast.emit('receive-message', msg);
    });

    // SOS Acil Durum sinyalini ilet
    socket.on('send-sos', () => {
        socket.broadcast.emit('receive-sos');
    });

    socket.on('disconnect', () => {
        console.log('Cihaz ayrıldı:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
