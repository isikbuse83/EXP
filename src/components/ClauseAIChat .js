// import React, { useState } from 'react';
// import axios from 'axios';

// const AnthropicAPIComponent = () => {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');
//   const [error, setError] = useState('');

//   const callAnthropicAPI = async () => {
//     try {
//       const apiKey = process.env.REACT_APP_CLAUDE_AI_API_KEY; // .env dosyasından API anahtarını alır
//       if (!apiKey) {
//         throw new Error('API anahtarı bulunamadı. REACT_APP_CLAUDE_AI_API_KEY ortam değişkeni olarak ayarlandığından emin olun.');
//       }

//       console.log('Anthropic API\'ye şu içerikle mesaj gönderiliyor:', input);

//       const response = await axios.post('https://api.anthropic.com/v1/complete', {
//         max_tokens: 1024,
//         messages: [
//           {
//             role: 'user',
//             content: input,
//           },
//         ],
//         model: 'claude-3-5-sonnet-20240620',
//       }, {
//         headers: {
//           'Authorization': `Bearer ${apiKey}`,
//         },
//       });

//       const rawResponse = response.data.content;
//       console.log('Anthropic API\'den gelen ham yanıt:', rawResponse);

//       let extractedText = 'Metin içeriği ayıklanamadı.';
//       if (rawResponse.includes('text=')) {
//         const textStart = rawResponse.indexOf('text=') + 'text='.length;
//         const textEnd = rawResponse.indexOf(',', textStart);
//         extractedText = rawResponse.substring(textStart, textEnd);
//       }

//       setResponse(extractedText);
//     } catch (error) {
//       console.error('Anthropic API ile iletişimde bir hata oluştu:', error.message);
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Anthropic API Çağrısı</h1>
//       <input 
//         type="text" 
//         value={input} 
//         onChange={(e) => setInput(e.target.value)} 
//         placeholder="Mesajınızı girin" 
//       />
//       <button onClick={callAnthropicAPI}>API Çağrısı Yap</button>
//       {response && <div><h3>Yanıt:</h3><p>{response}</p></div>}
//       {error && <div><h3>Hata:</h3><p>{error}</p></div>}
//     </div>
//   );
// };

// export default AnthropicAPIComponent;
