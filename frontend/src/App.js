import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Organisation.js'
import EcommerceInterface from './Components/Customer.js';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Signup />} />
      <Route path="/organisation" element={<Dashboard/>}/>
      <Route path='/customer' element={<EcommerceInterface/>}/>
    </Routes>
  );
}

export default App;