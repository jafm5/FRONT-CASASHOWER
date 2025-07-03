import React from 'react';
import ItemList from './ItemList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#f8f5f0', minHeight: '100vh' }}>
      <header className="text-center py-4 shadow-sm bg-white">
        <h1 className="display-5 fw-bold text-dark">Casa Shower</h1>
     <div style={{ backgroundColor: '#f8f5f0', textAlign: 'center' }}>
<img
  src="/casashower.jpeg"
  alt="Banner Casa Shower"
  className="img-fluid rounded shadow"
  style={{
    width: '100%',
    maxHeight: '800px',
    objectFit: 'contain',
    objectPosition: 'center',
  }}
/>

</div>

      </header>

      <main className="container my-5 px-3 px-md-5">
        <ItemList />
      </main>
    </div>
  );
}

export default App;
