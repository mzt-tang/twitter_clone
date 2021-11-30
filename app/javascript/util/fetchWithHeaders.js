const fetchWithHeaders = async (url, { headers = {}, ...options } = {}) => 
  await fetch(url, {
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    ...options
  })
  .then((response) => {
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else {
        return;
      }
    } else {
      throw new Error(response.statusText)
    }
  });

export default fetchWithHeaders;
