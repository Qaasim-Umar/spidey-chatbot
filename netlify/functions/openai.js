try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 50,
      }),
    });
  
    if (!response.ok) {
      const error = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: 'Error from OpenAI API', error }),
      };
    }
  
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error making request to OpenAI API', error: error.message }),
    };
  }
  