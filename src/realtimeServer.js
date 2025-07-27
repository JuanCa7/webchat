module.exports = httpServer => {

    const { Server } = require("socket.io");
    const io = new Server(httpServer);

    io.on("connection", socket => {

        socket.emit("yourSocketId", socket.id);

        socket.on("message",({message, user}) =>{
            io.emit("message",{
                user:user,
                message:message,
                senderId: socket.id
            })
        })

    });

}