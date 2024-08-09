// src/services/vextService.js
export async function fetchVextData(message) {
  const channelToken = generateUniqueToken(); 
  const endpointUrl = `https://payload.vextapp.com/hook/${process.env.REACT_APP_VEXT_ENDPOINT_ID}/catch/${channelToken}`;
  
  const options = {
      method: 'POST',
      headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Apikey: `Api-Key ${process.env.REACT_APP_VEXT_API_KEY}`
      },
      body: JSON.stringify({
          payload: message
      })
  };
  
  const response = await fetch(endpointUrl, options);
  
  if (!response.ok) {
      throw new Error("Error fetching response from Vext");
  }

  return response.json();
}

function generateUniqueToken() {
  return 'user-' + Math.random().toString(36).substr(2, 9);
}
