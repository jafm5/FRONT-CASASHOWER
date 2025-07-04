import React from 'react';
import ItemList from './ItemList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#f8f5f0', minHeight: '100vh' }}>
      <header className="text-center py-4 shadow-sm bg-white">
        <h1 className="display-5 fw-bold text-dark">Casa Shower</h1>
      </header>

      <main className="container my-5 px-3 px-md-5">
        <div className="row">
          {/* Columna de la imagen */}
          <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-center justify-content-center">
            <img
              src="/casashower.jpeg"
              alt="Banner Casa Shower"
              className="img-fluid rounded shadow"
              style={{
                maxHeight: '800px',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Columna del componente */}
          <div className="col-md-6">
            <ItemList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
