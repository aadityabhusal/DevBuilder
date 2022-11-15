export async function fetchData(url, headers) {
  try {
    const response = await fetch(url, { headers });
    const result = await response.json();
    return result;
  } catch (error) {
    return { error: error.message };
  }
}
