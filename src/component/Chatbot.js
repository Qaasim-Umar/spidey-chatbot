import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, type: 'user' },
      { text: '', type: 'bot' }, // Placeholder for bot reply, to be replaced
    ]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/.netlify/functions/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputMessage }),
      });

      const data = await response.json();
      const botReply = data.choices[0].text;

      // Update the bot reply in the messages array
      setMessages((prevMessages) =>
        prevMessages.map((message, index) =>
          index === prevMessages.length - 1
            ? { ...message, text: botReply, type: 'bot' }
            : message
        )
      );
    } catch (error) {
      console.error('Error generating response from OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container" id="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
