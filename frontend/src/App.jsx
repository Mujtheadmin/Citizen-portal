import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000/api/complaints";

function App() {
  const [form, setForm] = useState({
    citizenName: "",
    category: "",
    description: "",
  });

  const [complaints, setComplaints] = useState([]);

  const loadComplaints = async () => {
    const res = await axios.get(API_URL);
    setComplaints(res.data);
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const submitComplaint = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ citizenName: "", category: "", description: "" });
    loadComplaints();
  };

  return (
    <div className="container">
      <h1>DESC Citizen Complaint Portal</h1>
      <p>Cloud-Native Kubernetes Demo Application</p>

      <form onSubmit={submitComplaint} className="card">
        <input
          placeholder="Citizen Name"
          value={form.citizenName}
          onChange={(e) => setForm({ ...form, citizenName: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <textarea
          placeholder="Complaint Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button type="submit">Submit Complaint</button>
      </form>

      <h2>Submitted Complaints</h2>

      {complaints.map((item) => (
        <div className="card" key={item.id}>
          <b>{item.trackingId}</b>
          <p>{item.citizenName}</p>
          <p>{item.category}</p>
          <p>{item.description}</p>
          <small>Status: {item.status}</small>
        </div>
      ))}
    </div>
  );
}

export default App;