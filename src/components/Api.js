// Create an instance of the Api class
const api = new Api({
  baseUrl: "https://your-api-url.com", // Replace with your actual API URL
  headers: {
    authorization: "Bearer your-auth-token", // Replace with your actual token if applicable
    "Content-Type": "application/json",
  },
});

// Debug: Log the `api` instance to ensure it's defined
console.log(api);

// Export the `api` instance
export default api;
