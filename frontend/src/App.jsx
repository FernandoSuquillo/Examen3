import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import * as api from './api';
import './App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Sistema de Siniestros</h1>
      <div className="links">
        <Link to="/policies">Pólizas</Link>
        <Link to="/providers">Proveedores</Link>
        <Link to="/claims">Siniestros</Link>
      </div>
    </nav>
  );
}

function Policies() {
  const [policies, setPolicies] = useState([]);
  const [form, setForm] = useState({ numeroPoliza: '', tipo: '', estado: 'ACTIVA' });

  useEffect(() => { load(); }, []);

  const load = () => api.getPolicies().then(res => setPolicies(res.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.createPolicy(form).then(() => {
      load();
      setForm({ numeroPoliza: '', tipo: '', estado: 'ACTIVA' });
    }).catch(err => alert('Error al crear póliza'));
  };

  return (
    <div className="page">
      <h2>Gestión de Pólizas</h2>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Número Póliza" value={form.numeroPoliza} onChange={e => setForm({ ...form, numeroPoliza: e.target.value })} required />
        <input placeholder="Tipo (VIDA, AUTO, SALUD...)" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} required />
        <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
          <option value="ACTIVA">ACTIVA</option>
          <option value="CANCELADA">CANCELADA</option>
          <option value="EXPIRADA">EXPIRADA</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
      <table>
        <thead><tr><th>ID</th><th>Número</th><th>Tipo</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>
          {policies.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.numeroPoliza}</td><td>{p.tipo}</td><td>{p.estado}</td>
              <td><button onClick={() => api.deletePolicy(p.id).then(load)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Providers() {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({ nombre: '', tipo: 'TALLER', ciudad: '' });

  useEffect(() => { load(); }, []);

  const load = () => api.getProviders().then(res => setProviders(res.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.createProvider(form).then(() => {
      load();
      setForm({ nombre: '', tipo: 'TALLER', ciudad: '' });
    }).catch(err => alert('Error al crear proveedor'));
  };

  return (
    <div className="page">
      <h2>Gestión de Proveedores</h2>
      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
        <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
          <option value="TALLER">TALLER</option>
          <option value="CLINICA">CLÍNICA</option>
          <option value="GRUA">GRÚA</option>
        </select>
        <input placeholder="Ciudad" value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} required />
        <button type="submit">Guardar</button>
      </form>
      <table>
        <thead><tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Ciudad</th><th>Acciones</th></tr></thead>
        <tbody>
          {providers.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.nombre}</td><td>{p.tipo}</td><td>{p.ciudad}</td>
              <td><button onClick={() => api.deleteProvider(p.id).then(load)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Claims() {
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    numeroCaso: '', fecha: '', descripcion: '', montoEstimado: 0, estado: 'ABIERTO', polizaId: '', proveedorId: ''
  });

  useEffect(() => {
    load();
    api.getPolicies().then(res => setPolicies(res.data));
    api.getProviders().then(res => setProviders(res.data));
  }, []);

  const load = () => api.getClaims().then(res => setClaims(res.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.createClaim(form).then(() => {
      load();
      // Reset form
    }).catch(err => alert('Error al registrar siniestro. Verifique IDs.'));
  };

  return (
    <div className="page">
      <h2>Registro de Siniestros</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <input placeholder="Número Caso" value={form.numeroCaso} onChange={e => setForm({ ...form, numeroCaso: e.target.value })} required />
        <input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} required />
        <input placeholder="Descripción" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} required />
        <input type="number" placeholder="Monto Estimado" value={form.montoEstimado} onChange={e => setForm({ ...form, montoEstimado: e.target.value })} required />

        <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
          <option value="ABIERTO">ABIERTO</option>
          <option value="EN_PROCESO">EN PROCESO</option>
          <option value="CERRADO">CERRADO</option>
        </select>

        <select value={form.polizaId} onChange={e => setForm({ ...form, polizaId: e.target.value })} required>
          <option value="">Seleccione Póliza</option>
          {policies.map(p => <option key={p.id} value={p.id}>{p.numeroPoliza} - {p.tipo}</option>)}
        </select>

        <select value={form.proveedorId} onChange={e => setForm({ ...form, proveedorId: e.target.value })} required>
          <option value="">Seleccione Proveedor</option>
          {providers.map(p => <option key={p.id} value={p.id}>{p.nombre} ({p.tipo})</option>)}
        </select>

        <button type="submit">Registrar Siniestro</button>
      </form>

      <table>
        <thead><tr><th>ID</th><th>Caso</th><th>Fecha</th><th>Desc</th><th>Monto</th><th>Estado</th><th>Póliza</th><th>Prov</th><th>Acciones</th></tr></thead>
        <tbody>
          {claims.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.numeroCaso}</td><td>{c.fecha}</td><td>{c.descripcion}</td><td>{c.montoEstimado}</td><td>{c.estado}</td><td>{c.polizaId}</td><td>{c.proveedorId}</td>
              <td><button onClick={() => api.deleteClaim(c.id).then(load)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<h3>Bienvenido al Sistema de Gestión de Siniestros</h3>} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/claims" element={<Claims />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
