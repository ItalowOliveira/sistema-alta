import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AppLayout } from "./AppLayout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CadastroPaciente from "./pages/cadastroPacientes";
import GerenciamentoUser from "./pages/gerenciamentoUser";
import Impressoes from "./pages/impressoes";
import Pta from "./pages/pta";
import Pts from "./pages/pts";
import Altas from "./pages/altas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota sem Navbar/Sidebar */}

        <Route path="/" element={<Login />} />

        {/* Rotas com Navbar/Sidebar */}
        <Route element={<AppLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
          <Route path="/gerenciamento-usuarios" element={<GerenciamentoUser />} />
          <Route path="/impressoes" element={<Impressoes />} />   
          <Route path="/altas" element={<Altas />} /> 
          <Route path="/pta" element={<Pta />} />
          <Route path="/pts" element={<Pts />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
