const fetchWithHeaders = (url, { headers = {}, ...options } = {}) => 
  fetch(url, {
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    ...options
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText)
    }
  });

export default fetchWithHeaders;
