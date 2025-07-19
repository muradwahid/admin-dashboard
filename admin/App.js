import { Toaster } from 'react-hot-toast';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import BPLSettings from '../settings/BPLSettings';
import Layout from './Layout/Layout';
import Blocks from './Pages/Blocks';
import Demo from './Pages/Demo/Demo';
import DemoTwo from './Pages/DemoTwo/DemoTwo';
import FreeTrialForm from './Pages/FreeTrialForm/FreeTrialForm';
import FreeTrialPopup from './Pages/FreeTrialPopup/FreeTrialPopup';
import InDev from './Pages/InDev';
import Video from './Pages/Video/Video';
import Welcome from './Pages/Welcome';

const App = ({ options }) => {

  const freemius = {
    product_id: '18090',
    plan_id: '30020',
    public_key: 'pk_6a648d36975ea248f33e60908ed11',
    trial: "free"
  }


  return (
    <HashRouter>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/inDev" element={<InDev />} />
        <Route path="/settings" element={<Layout><div style={{ width: "70%", margin: "0 auto" }}><BPLSettings options={options} /></div></Layout>} />
        <Route path="/demo" element={<Layout><Demo /></Layout>} />
        <Route path="/demo2" element={<Layout><div style={{ width: "70%", margin: "0 auto" }}><DemoTwo /></div></Layout>} />
        <Route path="/video" element={<Video />} />
        <Route path="/free-trial-form" element={<FreeTrialForm freemius={freemius} />} />
        <Route path="/free-trial-popup" element={<FreeTrialPopup freemius={freemius} />} />

        {/* When no routes match, it will redirect to this route path. Note that it should be registered above. */}
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App;