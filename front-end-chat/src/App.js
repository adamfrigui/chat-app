
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Chat from './pages/chat/Chat';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Chat/>} path="/chat"/>
          <Route element={<Login/>} path="/login"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
