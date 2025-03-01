import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';   // Import Login component
import Dashboard from './pages/Dashboard'; // Import Dashboard component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />  {/* Login page route */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page route */}
    </Routes>
  );
}

export default App;
