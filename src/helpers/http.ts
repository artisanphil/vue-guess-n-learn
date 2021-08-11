export async function get<T>(
    request: any
  ): Promise<T> {
    const response = await fetch(process.env.VUE_APP_BACKEND + request, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'Access-Control-Request-Method': '*',
      },
      credentials: 'include',
    });
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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'Access-Control-Request-Method': '*',
      },
      credentials: 'include',
      body: JSON.stringify(body)
    });

    return await response.json();
  }