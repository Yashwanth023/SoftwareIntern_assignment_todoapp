import React, { useState } from 'react';

const GptHelper = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResponse('');

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    if (!apiKey) {
      setError('API key is missing. Please check your environment variables.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo', // Replace with 'gpt-4' if needed
          messages: [
            { role: 'system', content: 'You are an assistant providing helpful responses.' },
            { role: 'user', content: input },
          ],
          max_tokens: 150,
          temperature: 0.6,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`HTTP error! status: ${res.status}, message: ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error:', error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>GPT Helper</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter your question or prompt here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default GptHelper;
