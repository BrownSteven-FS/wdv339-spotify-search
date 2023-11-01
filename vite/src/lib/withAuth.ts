export const withAuthFetch = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const token = localStorage.getItem('token');
    const headers = options.headers as Record<string, string> || {};

    if (token) {
      headers['Authorization'] =  JSON.parse(token);
    }
  
    const config: RequestInit = {
        ...options,
        headers: headers
      };
    
    const response = await fetch(url, config);
    return response;
  };