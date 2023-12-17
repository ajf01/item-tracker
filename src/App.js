import Register from "./components/Authentication/register";
import Login from "./components/Authentication/login";
import Dashboard from "./components/Dashboard/dashboard";
import Threads from "./components/Threads/threads";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/:id/threads' element={<Threads />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;