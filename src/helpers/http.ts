export async function get<T>(
    request: any
  ): Promise<T> {
    const response = await fetch(process.env.VUE_APP_BACKEND + request);
    const body = await response.json();
    return body;
  }

  export async function post<T>(
    request: any,
    body: any
  ): Promise<T> {
    const response = await fetch(process.env.VUE_APP_BACKEND + request, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'Access-Control-Request-Method': '*'
      },
      body: JSON.stringify(body)
    });

    return await response.json();
  }