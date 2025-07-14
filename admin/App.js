import { Toaster } from 'react-hot-toast';
import {HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import BPLSettings from '../settings/BPLSettings';
import Layout from './Layout/Layout';
import Blocks from './Pages/Blocks';
import InDev from './Pages/InDev';
import Welcome from './Pages/Welcome';
import Demo from './Pages/Demo/Demo';
import DemoTwo from './Pages/DemoTwo/DemoTwo';
import Video from './Pages/Video/Video';

const App = ({ options }) => {
  return (
    <HashRouter>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/inDev" element={<InDev />} />
        <Route path="/settings" element={<Layout><div style={{width:"70%",margin:"0 auto"}}><BPLSettings options={options} /></div></Layout>} />
        <Route path="/demo"  element={<Layout><Demo/></Layout>} />
        <Route path="/demo2" element={<Layout><div style={{ width: "70%", margin: "0 auto" }}><DemoTwo /></div></Layout>} />
        <Route path="/video" element={<Video/>} />

        {/* When no routes match, it will redirect to this route path. Note that it should be registered above. */}
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App;