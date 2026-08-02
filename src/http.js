export async function fetchMenu() {
  const response = await fetch("http://localhost:3000/meals/");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch menu data");
  }
  return data;
}