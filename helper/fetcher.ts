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

    // Handle different response types
    const contentType = response.headers.get('content-type');
    let data;

    // Check if response is ok before trying to parse
    if (!response.ok) {
      if (contentType && contentType.includes('application/problem+json')) {
        data = await response.json();
        throw new Error(data.detail || `HTTP error! status: ${response.status}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      // Parse JSON response
      data = await response.json();
    } catch (parseError) {
      throw new Error('Failed to parse JSON response');
    }

    return {
      data,
      status: response.status,
      ok: true
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
