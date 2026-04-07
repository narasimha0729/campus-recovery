import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getUserDetails } from "../../Services/LoginService";
import "./ChatMessage.css";
import { useNavigate } from "react-router-dom";

let stompClient = null;

const ChatMessage = () => {
    let navigate = useNavigate();
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState("");
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem("chatMessages");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    // Fetch user details and connect
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await getUserDetails();
                const user = response.data?.username || response.data?.personlName || response.data;
                
                if (user) {
                    setUsername(user);
                    connectToWebSocket(user);
                } else {
                    console.error("Username not found in API response");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();

        return () => {
            if (stompClient) {
                console.log("🔌 Disconnecting WebSocket...");
                stompClient.deactivate();
                stompClient = null;
            }
        };
    }, []);

    const connectToWebSocket = (userName) => {
        if (stompClient && stompClient.active) return;

        console.log("🚀 Connecting to WebSocket as:", userName);

        stompClient = new Client({
            webSocketFactory: () => new SockJS("http://localhost:9602/lostfound/ws"),
            onConnect: () => {
                console.log("✅ WebSocket Connected!");
                setConnected(true);

                // Subscribe to messages
                stompClient.subscribe("/topic/messages", (payload) => {
                    const msg = JSON.parse(payload.body);
                    setMessages((prev) => [...prev, msg]);
                });

                // Subscribe to online users
                stompClient.subscribe("/topic/users", (payload) => {
                    const users = JSON.parse(payload.body);
                    setOnlineUsers(users);
                });

                // Register user
                stompClient.publish({
                    destination: "/app/register",
                    body: JSON.stringify({ sender: userName, content: "joined" }),
                });
            },
            onDisconnect: () => {
                console.log("❌ WebSocket Disconnected");
                setConnected(false);
            },
            onError: (err) => console.error("WebSocket Error:", err),
        });

        stompClient.activate();
    };

    const sendMessage = () => {
        if (input.trim() && connected) {
            const chatMessage = {
                sender: username,
                content: input,
                timestamp: new Date().toLocaleTimeString(),
            };

            stompClient.publish({
                destination: "/app/sendMessage",
                body: JSON.stringify(chatMessage),
            });

            setInput("");
        }
    };

    const clearChat = () => {
        setMessages([]);
        localStorage.removeItem("chatMessages");
    };

    if (loading) return <div className="chat-container"><h3>Loading Chat...</h3></div>;

    return (
        <div className="chat-container">
            <div className="chat-room">
                {/* Sidebar */}
                <div className="sidebar p-3 bg-light border-end" style={{ width: "250px" }}>
                    <h4 className="mb-4">Online Users 👥</h4>
                    <ul className="list-group">
                        {onlineUsers.map((user, index) => (
                            <li key={index} className="list-group-item border-0 bg-transparent py-2">
                                <span className={`badge rounded-circle me-2 ${user === username ? 'bg-primary' : 'bg-success'}`} style={{ padding: "5px" }}> </span>
                                {user} {user === username && "(You)"}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat Area */}
                <div className="chat-content flex-grow-1 d-flex flex-direction-column">
                    <div className="chat-header d-flex justify-content-between align-items-center p-3 text-white" style={{ background: "#f58c3a" }}>
                        <span>Chat Room - {username}</span>
                        <button className="btn btn-sm btn-outline-light" onClick={clearChat}>Clear History</button>
                    </div>

                    <div className="messages p-3 flex-grow-1" style={{ overflowY: "auto", background: "#f9f9f9" }}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`d-flex mb-3 ${msg.sender === username ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div className={`p-2 rounded shadow-sm'}`} style={{ 
                                    maxWidth: "70%", 
                                    background: msg.sender === username ? "#dcf8c6" : "white",
                                    border: "1px solid #eee"
                                }}>
                                    <div className="small text-muted mb-1" style={{ fontSize: "0.75rem" }}>
                                        {msg.sender} • {msg.timestamp}
                                    </div>
                                    <div>{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="input-area p-3 border-top bg-white">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control rounded-pill me-2"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                            />
                            <button className="btn btn-primary rounded-pill px-4" onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <button 
                className="btn btn-secondary mt-3 position-absolute top-0 start-0 m-4"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
        </div>
    );
};

export default ChatMessage;