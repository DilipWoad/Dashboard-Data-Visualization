// export const base_url = "http://localhost:8080/api/v1/data";
export const base_url = "https://dashboard-data-visualization.onrender.com/api/v1/data"

export function formatToDDMMYYYY(dateString) {
  const date = new Date(dateString);

  // Extract parts and pad with leading zeros if necessary
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JS
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
