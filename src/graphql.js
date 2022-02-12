export async function query (strings, ...keys) {
  let query = strings[0]
  keys.forEach((key, i) => {
    query += key + strings[i + 1]
  })
  const response = await fetch(
    process.env.DATOCMS_URLS,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({
        query
      })
    })
  const json = await response.json()
  if (response.ok) {
    return json.data
  } else {
    throw new Error(response.statusText)
  }
}