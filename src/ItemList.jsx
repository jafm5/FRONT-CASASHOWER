import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/api/items`;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ item_name: '', estado: false, cantidad: 1 });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API);
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
      } else {
        await axios.post(API, form);
      }
      setForm({ item_name: '', estado: false, cantidad: 1 });
      setEditId(null);
      fetchItems();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchItems();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      item_name: item.item_name,
      estado: item.estado,
      cantidad: item.cantidad || 1,
    });
    setEditId(item._id);
  };

  return (
    <div className="container-fluid">
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row gy-3 gx-2 align-items-center">
              <div className="col-12 col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del ítem"
                  value={form.item_name}
                  onChange={(e) => setForm({ ...form, item_name: e.target.value })}
                  required
                />
              </div>
              <div className="col-12 col-md-2 d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.checked })}
                />
                <label className="form-check-label">Activo</label>
              </div>
              <div className="col-12 col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Cantidad"
                  min="1"
                  value={form.cantidad}
                  onChange={(e) => setForm({ ...form, cantidad: parseInt(e.target.value, 10) })}
                  required
                />
              </div>
              <div className="col-12 col-md-3">
                <button type="submit" className="btn btn-primary w-100">
                  {editId ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Nombre del Ítem</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.item_name}</td>
                <td className="text-center">{item.cantidad}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;
