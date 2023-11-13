import React, { useState } from 'react';
import "./window.css"

function window() {
    const [messages, setMessages] = useState([
        { from: 'AI', text: 'What can I help you with today?' },
        // ... initial messages if any
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = (event) => {
        event.preventDefault();
        if (inputValue.length !== 0) {
            const newMessage = { from: 'User', text: inputValue };
            setMessages([...messages, newMessage]);
            setInputValue('');
            // Scroll to the bottom of the chat history
        }
    };

    return (
        <div className="dialogue-window">
            <header className="dialogue-header">
                Currently Referencing: <span className='highlight'>CodeMirror.js</span>, main.py
            </header>
            <section className="dialogue-history">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.from}`}>
                        {message.text}
                    </div>
                ))}
            </section>
            <form className="dialogue-input" onSubmit={handleSend}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button type="submit" className='submit'>Send</button>
            </form>
        </div>
    );
}

export default window;
