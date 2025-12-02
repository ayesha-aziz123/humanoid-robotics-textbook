import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection().toString().trim();
      setSelectedText(selection);
    };

    document.addEventListener('mouseup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to fetch response');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedTextSubmit = async () => {
    if (!selectedText) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:8000/query-selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_text: selectedText, query: query || null }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to fetch response from selected text');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSelectedText(''); // Clear selected text after submission
      setQuery(''); // Clear query after submission
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
      <h3>Physical AI Chatbot</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about Physical AI..."
          style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>

      {selectedText && (
        <div style={{ marginBottom: '16px' }}>
          <p>Selected text: "{selectedText.substring(0, 100)}..."</p>
          <button onClick={handleSelectedTextSubmit} disabled={loading} style={{ padding: '8px 16px', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>
            {loading ? 'Querying...' : 'Query Selected Text'}
          </button>
        </div>
      )}

      {error && <div style={{ color: 'red', marginBottom: '16px' }}>Error: {error}</div>}

      {response && (
        <div>
          <h4>Answer:</h4>
          <p>{response.answer}</p>
          {response.sources && response.sources.length > 0 && (
            <div>
              <h5>Sources:</h5>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {response.sources.map((source, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>
                    - {source.file}: "{source.text_snippet.substring(0, 100)}..."
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
