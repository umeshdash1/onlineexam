const baseUrl = 'http://localhost:8000';

const api = {
  get: (url) => fetch(`${baseUrl}/${url}`)
                .then((response) => response.json()),
  post: (url, data) =>
    fetch(`${baseUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json()),
  put: (url, data) =>
    fetch(`${baseUrl}/${url}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json()),
};

export default api;
