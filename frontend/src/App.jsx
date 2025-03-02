import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Consent from './pages/Consent';

function App() {
  return (
    <Routes>
      {/* Login page without Layout */}
      <Route path="/" element={<Login />} />

      {/* Protected pages wrapped in Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<User />} />
        <Route path="/consents" element={<Consent />} />
      </Route>
    </Routes>
  );
}

export default App;