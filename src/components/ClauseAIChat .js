import React, { useState } from 'react';
import axios from 'axios';


const ClaudeAIChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = process.env.REACT_APP_CLAUDE_AI_API_KEY;
    const apiUrl = 'https://api.claude.ai/v1/query';

    const requestData = {
      prompt: prompt,
      max_tokens: 150,
    };

    try {
      const result = await axios.post(apiUrl, requestData, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      setResponse(result.data);
    } catch (error) {
      console.log('Error:', error);   //console.error('error'.error);
      setResponse('Hata: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Claude AI Soru-Cevap</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Soru:</label>
        <input
          type="text"
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Gönder</button>
      </form>
      <div id="response">{response}</div>
    </div>
  );
};

export default ClaudeAIChat;
