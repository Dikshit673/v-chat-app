import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
})

const userSocketMap: Record<string, string> = {};

export function getRecieverSocketId(userId: string) : string | undefined {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (typeof userId === 'string') {
        userSocketMap[userId] = socket.id;
    }
    io.emit('getOnlineUsers', Object.keys(userSocketMap));


    socket.on('disconnect', () => {
        console.log("A User is disconnect");
        if (typeof userId === 'string') {
            delete userSocketMap[userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export {io, app, server};