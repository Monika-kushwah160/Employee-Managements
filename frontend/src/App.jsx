import { useEffect, useState } from "react";
import { createEmployee, deleteEmployee, getEmployees } from "./api";

const emptyForm = {
  employee_code: "",
  name: "",
  email: "",
  department: "",
};

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  async function loadEmployees(value = search) {
    try {
      setError("");
      setEmployees(await getEmployees(value));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadEmployees("");
  }, []);

  function updateField(event) {
    setForm({...form, [event.target.name]: event.target.value});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      await createEmployee(form);
      setForm(emptyForm);
      await loadEmployees();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEmployee(id);
      await loadEmployees();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <h1>Employee Management</h1>

      {error && <div className="error">{error}</div>}

      <section className="card">
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit} className="form">
          <input name="employee_code" placeholder="Employee Code" value={form.employee_code} onChange={updateField} required />
          <input name="name" placeholder="Name" value={form.name} onChange={updateField} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={updateField} required />
          <input name="department" placeholder="Department" value={form.department} onChange={updateField} required />
          <button type="submit">Create Employee</button>
        </form>
      </section>

      <section className="card">
        <div className="toolbar">
          <h2>Employees</h2>
          <input
            placeholder="Search..."
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              setSearch(value);
              loadEmployees(value);
            }}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.employee_code}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>
                  <button onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;
