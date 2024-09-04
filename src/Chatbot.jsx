import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newMessages = [...messages, { role: 'user', content: message }];
        setMessages(newMessages);
        setMessage('');

        try {
            const response = await axios.post('https://crud-server-ashy.vercel.app/api/chatbot', { message });
            setMessages([...newMessages, response.data.choices[0].message]);
        } catch (error) {
            console.error('Error sending message to chatbot:', error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div>
            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <strong>{msg.role === 'user' ? 'You:' : 'Bot:'}</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="chatbox-textarea">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
        </div>
    );
};

export default Chatbot;


