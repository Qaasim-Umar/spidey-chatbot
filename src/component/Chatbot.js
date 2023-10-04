import React, { useState } from 'react';
import * as openai from 'openai';

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Initialize the OpenAI client
      const openaiClient = new openai.OpenAI({ apiKey: 'vsk-goJHTaTGTxiPzrcZbketT3BlbkFJMmCfLSct4YghGh4dDUNV' });

  
      // Generate a response from OpenAI
      const response = await openaiClient.createCompletion({
        model: 'text-davinci-002',
        prompt,
        temperature: 0.7,
      });
  
      // Set the response state
      setResponse(response.choices[0].text);
    } catch (error) {
      // Handle API error here, e.g., display an error message to the user
      console.error('Error generating response from OpenAI:', error);
      // Optionally, set an error state or display an error message to the user
    }
  };
  
  return (
    <div>
      <h1>Chatbot</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};
export default Chatbot;