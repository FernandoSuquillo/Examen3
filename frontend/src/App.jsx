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
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { load(); }, []);

  const load = () => api.getPolicies().then(res => setPolicies(res.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...form, tipo: form.tipo.toUpperCase() }; // FORCE UPPERCASE

    if (editingId) {
      api.updatePolicy(editingId, dataToSend).then(() => {
        load();
        resetForm();
      }).catch(err => alert('Error actualizando póliza'));
    } else {
      api.createPolicy(dataToSend).then(() => {
        load();
        resetForm();
      }).catch(err => alert('Error creando póliza'));
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({ numeroPoliza: p.numeroPoliza, tipo: p.tipo, estado: p.estado });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ numeroPoliza: '', tipo: '', estado: 'ACTIVA' });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Gestión de Pólizas</h2>
        {editingId && <button onClick={resetForm} className="btn-secondary">Cancelar Edición</button>}
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Número Póliza" value={form.numeroPoliza} onChange={e => setForm({ ...form, numeroPoliza: e.target.value })} required />
        <input placeholder="Tipo (VIDA, AUTO, SALUD...)" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} required />
        <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
          <option value="ACTIVA">ACTIVA</option>
          <option value="CANCELADA">CANCELADA</option>
          <option value="EXPIRADA">EXPIRADA</option>
        </select>
        <button type="submit">{editingId ? 'Actualizar' : 'Guardar'}</button>
      </form>
      <div className="table-responsive">
        <table>
          <thead><tr><th>ID</th><th>Número</th><th>Tipo</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {policies.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.numeroPoliza}</td><td>{p.tipo}</td><td>{p.estado}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(p)}>Editar</button>
                  <button className="btn-delete" onClick={() => api.deletePolicy(p.id).then(load)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Providers() {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({ nombre: '', tipo: '', ciudad: '' }); // Tipo is now empty string by default
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { load(); }, []);

  const load = () => api.getProviders().then(res => setProviders(res.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      nombre: form.nombre.toUpperCase(),
      tipo: form.tipo.toUpperCase(), // FORCE UPPERCASE
      ciudad: form.ciudad.toUpperCase()
    };

    if (editingId) {
      api.updateProvider(editingId, dataToSend).then(() => {
        load();
        resetForm();
      }).catch(err => alert('Error actualizando proveedor'));
    } else {
      api.createProvider(dataToSend).then(() => {
        load();
        resetForm();
      }).catch(err => alert('Error creando proveedor'));
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({ nombre: p.nombre, tipo: p.tipo, ciudad: p.ciudad });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ nombre: '', tipo: '', ciudad: '' });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Gestión de Proveedores</h2>
        {editingId && <button onClick={resetForm} className="btn-secondary">Cancelar Edición</button>}
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input placeholder="Nombre Proveedor" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
        {/* Changed select to input for free text, matching Policies style */}
        <input placeholder="Tipo (TALLER, CLÍNICA, GRÚA...)" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} required />
        <input placeholder="Ciudad" value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} required />
        <button type="submit">{editingId ? 'Actualizar' : 'Guardar'}</button>
      </form>
      <div className="table-responsive">
        <table>
          <thead><tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Ciudad</th><th>Acciones</th></tr></thead>
          <tbody>
            {providers.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.nombre}</td><td>{p.tipo}</td><td>{p.ciudad}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(p)}>Editar</button>
                  <button className="btn-delete" onClick={() => api.deleteProvider(p.id).then(load)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Claims() {
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    numeroCaso: '', fecha: '', descripcion: '', montoEstimado: '', estado: 'ABIERTO', polizaId: '', proveedorId: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    load();
    api.getPolicies().then(res => setPolicies(res.data));
    api.getProviders().then(res => setProviders(res.data));
  }, []);

  const load = () => api.getClaims().then(res => setClaims(res.data)).catch(console.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      api.updateClaim(editingId, form).then(() => {
        load();
        resetForm();
      }).catch(err => alert('Error actualizando siniestro. Verifique IDs.'));
    } else {
      api.createClaim(form).then(() => {
        load();
        resetForm();
      }).catch(err => alert('Error creando siniestro. Verifique IDs.'));
    }
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setForm({
      numeroCaso: c.numeroCaso,
      fecha: c.fecha,
      descripcion: c.descripcion,
      montoEstimado: c.montoEstimado,
      estado: c.estado,
      polizaId: c.polizaId,
      proveedorId: c.proveedorId
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      numeroCaso: '', fecha: '', descripcion: '', montoEstimado: '', estado: 'ABIERTO', polizaId: '', proveedorId: ''
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Registro de Siniestros</h2>
        {editingId && <button onClick={resetForm} className="btn-secondary">Cancelar Edición</button>}
      </div>

      <form onSubmit={handleSubmit} className="form-grid">
        <input placeholder="Número Caso" value={form.numeroCaso} onChange={e => setForm({ ...form, numeroCaso: e.target.value })} required />
        <input type="date" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} required />
        <input placeholder="Descripción" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} required />

        {/* Monto input improved: Placeholder and number only logic handled by browser type="number" */}
        <input
          type="number"
          placeholder="Ingrese el monto ($)"
          step="0.01"
          min="0"
          value={form.montoEstimado}
          onChange={e => setForm({ ...form, montoEstimado: e.target.value })}
          onKeyDown={(e) => {
            // Prevent 'e', 'E', '+', '-'
            if (["e", "E", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          required
        />

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

        <button type="submit">{editingId ? 'Actualizar' : 'Registrar'}</button>
      </form>

      <div className="table-responsive">
        <table>
          <thead><tr><th>ID</th><th>Caso</th><th>Fecha</th><th>Desc</th><th>Monto</th><th>Estado</th><th>Póliza</th><th>Prov</th><th>Acciones</th></tr></thead>
          <tbody>
            {claims.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td><td>{c.numeroCaso}</td><td>{c.fecha}</td><td>{c.descripcion}</td><td>{c.montoEstimado}</td><td>{c.estado}</td><td>{c.polizaId}</td><td>{c.proveedorId}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(c)}>Editar</button>
                  <button className="btn-delete" onClick={() => api.deleteClaim(c.id).then(load)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Home() {
  return (
    <div className="page" style={{ textAlign: 'center', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', color: '#0f172a', marginBottom: '1.5rem', fontWeight: '800' }}>Sistema de Gestión de Siniestros</h1>
      <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
        Plataforma centralizada para la administración de pólizas de seguros, red de proveedores y seguimiento de siniestros en tiempo real.
      </p>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <Link to="/policies" style={{ textDecoration: 'none' }}><button style={{ height: '50px', padding: '0 2rem', fontSize: '1.1rem' }}>Gestionar Pólizas</button></Link>
        <Link to="/claims" style={{ textDecoration: 'none' }}><button style={{ height: '50px', padding: '0 2rem', fontSize: '1.1rem', background: '#0f172a' }}>Registrar Siniestro</button></Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/claims" element={<Claims />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
