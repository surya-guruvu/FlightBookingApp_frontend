export const isUserAuthenticated = () => {
    const jwtToken = localStorage.getItem('jwtToken'); // Replace with your token retrieval logic
    
    if (jwtToken) {
      try {
        // Split the token into its three parts: header, payload, and signature
        const [headerEncoded, payloadEncoded] = jwtToken.split('.');
        
        // Decode the payload to retrieve the expiration claim
        const payload = JSON.parse(atob(payloadEncoded));
        console.log(payload);
        const { exp } = payload;
        
        // Check if the token has not expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (exp && exp > currentTime) {
          return true; // Token is valid and not expired
        }
      } catch (error) {
        console.error('Error decoding or validating JWT:', error);
        // Handle the error appropriately (e.g., log, clear token, etc.)
      }
  }
    
    return false; // Token is missing, expired, or invalid
  };
