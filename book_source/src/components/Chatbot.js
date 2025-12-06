// import React, { useState, useEffect, useRef } from 'react';
// import './Chatbot.css'; // Import the CSS file

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [selectedText, setSelectedText] = useState('');
//   const messagesEndRef = useRef(null);

//   // Scroll to the bottom of the messages container whenever messages update
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   // Effect to detect text selection
//   useEffect(() => {
//     const handleSelection = () => {
//       const selection = window.getSelection().toString().trim();
//       setSelectedText(selection);
//     };
//     document.addEventListener('mouseup', handleSelection);
//     return () => document.removeEventListener('mouseup', handleSelection);
//   }, []);

//   // Function to handle sending a message (both regular and selection-based)
//   const handleSendMessage = async (query, context = null) => {
//     if (!query && !context) return;

//     const userMessage = { sender: 'user', text: context ? `Query about: "${context}"
// ${query}` : query };
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue('');
//     setLoading(true);

//     const isSelectionQuery = !!context;
//     const endpoint = isSelectionQuery ? 'http://127.0.0.1:8000/query-selection' : 'http://127.0.0.1:8000/query';
//     const body = isSelectionQuery ? { selected_text: context, query: query || null } : { query };

//     try {
//       const res = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.detail || 'Failed to fetch response');
//       }

//       const data = await res.json();
//       const botMessage = { sender: 'bot', answer: data.answer, sources: data.sources };
//       setMessages(prev => [...prev, botMessage]);

//     } catch (err) {
//       const errorMessage = { sender: 'bot', answer: `Error: ${err.message}`, sources: [] };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//       setSelectedText(''); // Clear selection after use
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot-header">Physical AI Chatbot</div>
//       <div className="chatbot-messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender}-message`}>
//             {msg.sender === 'user' ? (
//               <div>{msg.text}</div>
//             ) : (
//               <div>
//                 <div>{msg.answer}</div>
//                 {msg.sources && msg.sources.length > 0 && (
//                   <div className="sources">
//                     <h5>Sources:</h5>
//                     <ul className="source-list">
//                       {msg.sources.map((source, i) => (
//                         <li key={i} className="source-item" title={source.file}>
//                            - {source.file.split(/[\\/]/).pop()} (Score: {source.score.toFixed(2)})
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//         {loading && <div className="message bot-message loading-indicator">Thinking...</div>}
//         <div ref={messagesEndRef} />
//       </div>

//       {selectedText && (
//         <div className="selected-text-bar">
//           <span>Selected: "{selectedText.substring(0, 50)}..."</span>
//           <button onClick={() => { handleSendMessage(inputValue, selectedText) }}>
//             Ask about this
//           </button>
//         </div>
//       )}

//       <form className="chatbot-input-form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Ask about the book..."
//           className="chatbot-input"
//         />
//         <button type="submit" disabled={loading} className="chatbot-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chatbot;






























import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Text selection handler
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection().toString().trim();
      setSelectedText(selection);
    };
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  // Send message function
  const handleSendMessage = async (query, context = null) => {
    if (!query && !context) return;

    const userMessage = { 
      sender: 'user', 
      text: context ? `${context}\n${query}` : query 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    const isSelectionQuery = !!context;
    const endpoint = isSelectionQuery ? 'http://127.0.0.1:8000/query-selection' : 'http://127.0.0.1:8000/query';
    const body = isSelectionQuery ? { selected_text: context, query: query || null } : { query };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to fetch response');
      }

      const data = await res.json();
      const botMessage = { sender: 'bot', answer: data.answer, sources: data.sources };
      setMessages(prev => [...prev, botMessage]);

    } catch (err) {
      const errorMessage = { sender: 'bot', answer: `Error: ${err.message}`, sources: [] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setSelectedText('');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        sender: 'bot',
        answer: "Hello! I'm your Physics AI Assistant. Ask me anything about physics or select text to get specific explanations.",
        sources: []
      }]);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className={`chatbot-toggle-btn ${isOpen ? 'chatbot-toggle-btn-open' : ''}`}
      >
        {isOpen ? (
          <svg className="chatbot-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="chatbot-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'chatbot-window-open' : 'chatbot-window-closed'}`}>
        <div className="chatbot-container">
          
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-header-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="chatbot-header-text">
                <h2>Physics AI Assistant</h2>
                <p>Online • Ready to help</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="chatbot-close-btn"
              title="Minimize"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="chatbot-messages-container">
            {messages.length === 0 ? (
              <div className="chatbot-welcome">
                <div className="chatbot-welcome-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3>Welcome to Physics AI</h3>
                <p>Ask me anything about physics or select text to get specific explanations.</p>
              </div>
            ) : (
              <div className="chatbot-messages">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`chatbot-message ${msg.sender === 'user' ? 'chatbot-user-message' : 'chatbot-bot-message'}`}
                  >
                    {msg.sender === 'user' ? (
                      <div className="chatbot-message-text">{msg.text}</div>
                    ) : (
                      <div>
                        <div className="chatbot-message-text">{msg.answer}</div>
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="chatbot-sources">
                            <h4>📚 Sources:</h4>
                            <div className="chatbot-sources-list">
                              {msg.sources.map((source, i) => (
                                <div 
                                  key={i} 
                                  className="chatbot-source-item"
                                  title={source.file}
                                >
                                  <div className="chatbot-source-file">
                                    {source.file.split(/[\\/]/).pop()}
                                  </div>
                                  <div className="chatbot-source-score">
                                    Relevance: {source.score.toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {loading && (
                  <div className="chatbot-loading">
                    <div className="chatbot-loading-dot"></div>
                    <div className="chatbot-loading-dot"></div>
                    <div className="chatbot-loading-dot"></div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Selected Text Bar */}
          {selectedText && (
            <div className="chatbot-selected-bar">
              <div className="chatbot-selected-content">
                <div className="chatbot-selected-text">
                  <span className="chatbot-selected-label">Selected Text:</span>
                  <p>{selectedText.substring(0, 60)}</p>
                </div>
                <button
                  onClick={() => handleSendMessage(inputValue, selectedText)}
                  className="chatbot-ask-btn"
                >
                  Ask
                </button>
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="chatbot-input-container">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (inputValue.trim()) {
                  handleSendMessage(inputValue);
                }
              }}
              className="chatbot-input-form"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your physics question..."
                className="chatbot-input-field"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className={`chatbot-send-btn ${loading || !inputValue.trim() ? 'chatbot-send-btn-disabled' : ''}`}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <p className="chatbot-tip">
              Tip: Select any text and click "Ask" for context-aware help
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;








