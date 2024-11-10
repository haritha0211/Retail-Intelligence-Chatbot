import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login';
import Signup from './Components/Signup';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;