import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    sports: "",
    sex:"",
    id:"",
  });

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5001/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ name: "", address: "", sports: "", sex:"", id: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sports">sports</label>
          <input
            type="text"
            className="form-control"
            id="sports"
            value={form.sports}
            onChange={(e) => updateForm({ sports: e.target.value })}
               onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex">sex</label>
          <input
            type="text"
            className="form-control"
            id="sex"
            value={form.sports}
            onChange={(e) => updateForm({ sex: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={form.id}
            onChange={(e) => updateForm({ id: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}