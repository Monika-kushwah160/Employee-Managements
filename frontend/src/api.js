const API_BASE = "/api";

export async function getEmployees(search = "") {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const response = await fetch(`${API_BASE}/employees${query}`);
  if (!response.ok) throw new Error("Failed to load employees");
  return response.json();
}

export async function createEmployee(employee) {
  const response = await fetch(`${API_BASE}/employees`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(employee),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Failed to create employee");
  return data;
}

export async function deleteEmployee(id) {
  const response = await fetch(`${API_BASE}/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete employee");
}
