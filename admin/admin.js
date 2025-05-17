import { createRoot } from 'react-dom/client';
import AppContainer from './Index';
import './admin.scss';
import { options } from './options';

document.addEventListener('DOMContentLoaded', () => {
  const adminEl = document.getElementById('prefixAdminDashboard');
  const nonce = adminEl.dataset.nonce;
  createRoot(adminEl).render(<AppContainer options={options} nonce={nonce} />);
});