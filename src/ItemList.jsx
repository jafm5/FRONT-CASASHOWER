import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/api/items`;

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ item_name: '', estado: false, cantidad: 1 });
  const [editId, setEditId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null); // 🆕 Para confirmar borrado

  const fetchItems = async () => {
    try {
      const res = await axios.get(API);
      setItems(res.data);
    } catch (error) {
      console.error('Error al obtener los ítems:', error);
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

      // ✅ Mostrar el modal de agradecimiento
      const thankYouModal = new window.bootstrap.Modal(document.getElementById('thankYouModal'));
      thankYouModal.show();

      // ⏱️ Ocultarlo luego de 3 segundos
      setTimeout(() => {
        thankYouModal.hide();
      }, 5000);
    }

    setForm({ item_name: '', estado: false, cantidad: 1 });
    setEditId(null);
    fetchItems();
  } catch (err) {
    console.error('Error al guardar ítem:', err);
  }
};


  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    const modal = new window.bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API}/${selectedItemId}`);
      fetchItems();
    } catch (err) {
      console.error('Error al eliminar ítem:', err);
    } finally {
      setSelectedItemId(null);
    }
  };

  const handleEdit = (item) => {
    setForm({ item_name: item.item_name, estado: item.estado, cantidad: item.cantidad });
    setEditId(item._id);
  };

  return (
    <>
      {/* 🧾 FORMULARIO */}
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row gy-3 gx-2 align-items-center">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre del basiquito"
                  value={form.item_name}
                  onChange={(e) => setForm({ ...form, item_name: e.target.value })}
                  required
                />
              </div>
              {/* <div className="col-md-3 d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.checked })}
                />
                <label className="form-check-label">Activo</label>
              </div> */}
              <div className="col-md-3">
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
              <div className="col-md-3">
                <button type="submit" className="btn btn-primary w-100">
                  {editId ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* 🧾 LISTA DE ITEMS */}
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="text-center mb-4">
            📋 Lista de Basiquitos a este momento
          </h4>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>Nombre del basiquito</th>
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
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteClick(item._id)}
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
      </div>

      {/* Modal de Agradecimiento */}
      <div className="modal fade" id="thankYouModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center">
            <div className="modal-body p-5">
              <h5 className="modal-title mb-3">¡Gracias! 💖</h5>
              <p>
                Muchas gracias por tu ayuda, significa mucho para esta etapa de mi vida.<br />
                ¡Sos la/el mejor! 😊
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 🧾 MODAL DE CONFIRMACIÓN */}
      <div
        className="modal fade"
        id="confirmModal"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">¿Eliminar basiquito?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              Esta acción no se puede deshacer. ¿Estás seguro que deseas eliminar este basiquito?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemList;
