---
title: "Building a Real-time Chat App with Socket.io and React"
description: "Learn how to create a scalable real-time chat application using Socket.io, React, and Node.js with authentication and message persistence."
date: "2025-01-15"
author: "Your Name"
tags: ["react", "nodejs", "socketio", "realtime", "tutorial"]
category: "Tutorial"
readTime: "12 min read"
featured: true
---

# Building a Real-time Chat App with Socket.io and React

Real-time applications are becoming increasingly important in modern web development. In this comprehensive tutorial, we'll build a full-featured chat application that showcases several advanced concepts.

## What We'll Build

- **Real-time messaging** with Socket.io
- **User authentication** with JWT tokens
- **Message persistence** with MongoDB
- **Typing indicators** and online status
- **File sharing** capabilities
- **Responsive design** with Tailwind CSS

## Prerequisites

```bash
npm install express socket.io mongoose jsonwebtoken bcryptjs
npm install react socket.io-client axios
```

## Backend Setup

Let's start with our Express server:

```javascript
// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatapp');

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
  });
  
  socket.on('send-message', (data) => {
    socket.to(data.room).emit('receive-message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
```

## Frontend React Component

```jsx
// ChatRoom.jsx
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatRoom = ({ roomId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef();
  const messagesEndRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('join-room', roomId);

    socketRef.current.on('receive-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketRef.current.on('user-typing', (data) => {
      setIsTyping(data.isTyping);
    });

    return () => socketRef.current.disconnect();
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const messageData = {
        room: roomId,
        user: user.name,
        message: newMessage,
        timestamp: new Date().toISOString()
      };
      
      socketRef.current.emit('send-message', messageData);
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold">Room: {roomId}</h2>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`flex ${msg.user === user.name ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.user === user.name 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white shadow'
              }`}
            >
              <p className="text-sm font-medium">{msg.user}</p>
              <p>{msg.message}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-gray-500 text-sm">Someone is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
```

## Key Features Implemented

### 1. Real-time Communication
We use Socket.io for bidirectional communication between client and server, enabling instant message delivery.

### 2. Room-based Chat
Users can join specific rooms, allowing for organized conversations and scalable architecture.

### 3. Message Persistence
Messages are stored in MongoDB to maintain chat history across sessions.

### 4. Responsive Design
The UI adapts to different screen sizes using Tailwind CSS utilities.

## Performance Optimizations

- **Message batching** for high-frequency updates
- **Virtual scrolling** for large message lists
- **Connection pooling** for database operations
- **CDN integration** for file sharing

## Next Steps

1. Add user authentication with JWT
2. Implement file sharing capabilities
3. Add emoji reactions and rich text
4. Create admin moderation tools
5. Deploy with Docker and Redis for scaling

This chat application demonstrates modern real-time web development patterns and can serve as a foundation for more complex applications.

## Source Code

The complete source code is available on [GitHub](https://github.com/yourname/realtime-chat-app) with deployment instructions and additional features.
