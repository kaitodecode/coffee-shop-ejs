const fetcher = async (url: string, options: RequestInit = {}) => {
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

  } catch (error: any) {
    // Return error object if request fails
    return {
      error: error.message,
      status: error.status || 500,
      ok: false
    };
  }
};

export default fetcher;
