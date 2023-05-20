import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    sports: "",
    sex:"",
    id:"",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5001/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedUser = {
      name: form.name,
      address: form.address,
      sports: form.sports,
      sex: form.sex,
      id: form.id,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5001/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedUser),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">address: </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={form.address}
            onChange={(e) => updateForm({ address: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sports">sports: </label>
          <input
            type="text"
            className="form-control"
            id="sports"
            value={form.sports}
            onChange={(e) => updateForm({ sports: e.target.value })}
           />
        </div>
        <div className="form-group">
          <label htmlFor="sex">sex: </label>
          <input
            type="text"
            className="form-control"
            id="sex"
            value={form.sex}
            onChange={(e) => updateForm({ sex: e.target.value })}
          />
        </div>        
        <div className="form-group">
          <label htmlFor="id">ID: </label>
          <input
            type="text"
            className="form-control"
            id="id"
            value={form.id}
            onChange={(e) => updateForm({ id: e.target.value })}
          />
        </div>

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}