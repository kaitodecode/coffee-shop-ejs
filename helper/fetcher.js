const fetcher = async (url, options = {}) => {
  try {
    // Set default headers if not provided
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json' // Add Accept header to handle 415 errors
    };

    // Merge default options with provided options
    const fetchOptions = {
      headers: {
        ...defaultHeaders,
        ...options.headers
      },
      ...options
    };

    // Make the API request
    const response = await fetch(url, fetchOptions);
    
    console.log(response)
    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/problem+json')) {
      data = await response.json();
      throw new Error(data.detail || `HTTP error! status: ${response.status}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse and return the JSON response
    data = await response.json();
    return {
      data,
      status: response.status,
      ok: response.ok
    };

  } catch (error) {
    // Return error object if request fails
    return {
      error: error.message,
      status: error.status || 500,
      ok: false
    };
  }
};

export default fetcher;

// Example usage for CRUD operations:

// CREATE - POST example
// const createUser = async (userData) => {
//   const response = await fetcher('https://api.example.com/users', {
//     method: 'POST',
//     body: JSON.stringify(userData)
//   });
//   return response;
// };

// READ - GET example
// const getUser = async (userId) => {
//   const response = await fetcher(`https://api.example.com/users/${userId}`);
//   return response;
// };

// UPDATE - PUT example
// const updateUser = async (userId, userData) => {
//   const response = await fetcher(`https://api.example.com/users/${userId}`, {
//     method: 'PUT',
//     body: JSON.stringify(userData)
//   });
//   return response;
// };

// DELETE example
// const deleteUser = async (userId) => {
//   const response = await fetcher(`https://api.example.com/users/${userId}`, {
//     method: 'DELETE'
//   });
//   return response;
// };

/* Usage examples:
const newUser = await createUser({ name: 'John Doe', email: 'john@example.com' });
const user = await getUser(123);
const updatedUser = await updateUser(123, { name: 'Jane Doe' });
const deletedUser = await deleteUser(123);
*/
