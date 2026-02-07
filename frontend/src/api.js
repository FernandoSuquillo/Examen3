import axios from 'axios';

// API BASE URLs
const POLICIES_URL = 'http://localhost:8081/api/polizas';
const PROVIDERS_URL = 'http://localhost:8082/api/proveedores';
const CLAIMS_URL = 'http://localhost:8083/api/siniestros';

// POLICIES
export const getPolicies = () => axios.get(POLICIES_URL);
export const createPolicy = (data) => axios.post(POLICIES_URL, data);
export const updatePolicy = (id, data) => axios.put(`${POLICIES_URL}/${id}`, data);
export const deletePolicy = (id) => axios.delete(`${POLICIES_URL}/${id}`);

// PROVIDERS
export const getProviders = () => axios.get(PROVIDERS_URL);
export const createProvider = (data) => axios.post(PROVIDERS_URL, data);
export const updateProvider = (id, data) => axios.put(`${PROVIDERS_URL}/${id}`, data);
export const deleteProvider = (id) => axios.delete(`${PROVIDERS_URL}/${id}`);

// CLAIMS
export const getClaims = () => axios.get(CLAIMS_URL);
export const createClaim = (data) => axios.post(CLAIMS_URL, data);
export const updateClaim = (id, data) => axios.put(`${CLAIMS_URL}/${id}`, data);
export const deleteClaim = (id) => axios.delete(`${CLAIMS_URL}/${id}`);
