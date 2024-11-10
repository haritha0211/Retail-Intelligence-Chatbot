import { Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Organisation.js'
import ChatbotInterface from './Components/Customer.js';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/organisation" element={<Dashboard/>}/>
      <Route path='/' element={<ChatbotInterface/>}/>
    </Routes>
  );
}

export default App;