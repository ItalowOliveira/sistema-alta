import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { AppLayout } from "./AppLayout";
import ProtectedRoute from "./componentes/auth/ProtectedRoute";
import RoleProtectedRoute from "./componentes/auth/RoleProtectedRoute";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CadastroPaciente from "./pages/cadastroPacientes";
import GerenciamentoUser from "./pages/gerenciamentoUser";
import Impressoes from "./pages/impressoes";
import Altas from "./pages/altas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota sem Navbar/Sidebar */}

        <Route path="/" element={<Login />} />

        {/* Rotas com Navbar/Sidebar */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
            <Route element={<RoleProtectedRoute allowedRoles={["Admin","Médico"]} />}>
              <Route path="/gerenciamento-usuarios" element={<GerenciamentoUser />} />
            </Route>
            <Route path="/impressoes" element={<Impressoes />} />   
            <Route path="/altas" element={<Altas />} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
