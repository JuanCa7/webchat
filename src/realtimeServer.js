module.exports = httpServer => {
    const { Server } = require("socket.io");
    const io = new Server(httpServer);

    io.on("connection", socket => {
        socket.emit("yourSocketId", socket.id);

        socket.on("joinRoom", room => {
            socket.join(room);
        });

        socket.on("leaveRoom", room => {
            socket.leave(room);
        });

        socket.on("message", ({ message, user, room }) => {
            io.to(room).emit("message", {
                user,
                message,
                senderId: socket.id,
                room
            });
        });
    });
}
