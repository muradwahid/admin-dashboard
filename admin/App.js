import { Toaster } from 'react-hot-toast';
import {HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import BPLSettings from '../settings/BPLSettings';
import Layout from './Layout/Layout';
import Blocks from './Pages/Blocks';
import InDev from './Pages/InDev';
import Welcome from './Pages/Welcome';

const App = ({ options, nonce }) => {
  return (
    <HashRouter>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/inDev" element={<InDev />} />
        <Route path="/settings"  element={<Layout><BPLSettings nonce={nonce} options={options} /></Layout>} />

        {/* When no routes match, it will redirect to this route path. Note that it should be registered above. */}
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App;