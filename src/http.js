export async function fetchMenu() {
  const response = await fetch("http://localhost:3000/meals/");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch menu data");
  }
  return data;
}

export async function postData(data) {
  const response = await fetch("http://localhost:3000/orders", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    throw new Error("Failed to post");
  }
  return response;
}