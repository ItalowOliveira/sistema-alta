import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Login from "./pages/login.tsx";
import Home from "./pages/home.tsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
