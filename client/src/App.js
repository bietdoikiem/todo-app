import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AuthContext from './context/AuthContext';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import Todos from './pages/Todos';

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todos" element={auth ? <Todos /> : <Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
