import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Ajuste das importações para usar caminhos relativos (../) em vez de aliases (@/)
import { Home } from "./pages/Home";
import { Support } from "./pages/Support";
import { AuthWorker } from "./pages/AuthWorker";
import { SearchPage } from "./pages/Search";
import { Profile } from "./pages/Profile";
import { HowItWorks } from "./pages/HowItWorks";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { EditProfile } from "./pages/dashboard/EditProfile";
import { Premium } from "./pages/dashboard/Premium";
import { Settings } from "./pages/dashboard/Settings";
import { NotFound } from "./pages/NotFound";
// Novas importações para o fluxo do cliente (caminhos ajustados)
import { ClientLandingPage } from "./pages/user/ClientLandingPage";
import { ClientRegister } from "./pages/user/ClientRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/como-funciona" element={<HowItWorks />} />
        
        {/* Rotas Profissional */}
        <Route path="/sou-profissional" element={<AuthWorker />} />
        
        {/* Rotas Cliente (NOVAS) */}
        <Route path="/sou-cliente" element={<ClientLandingPage />} />
        <Route path="/cadastro-cliente" element={<ClientRegister />} />

        <Route path="/busca" element={<SearchPage />} />
        <Route path="/perfil/:slug" element={<Profile />} />
        <Route path="/suporte" element={<Support />} />
        
        {/* Rotas do Painel (Dashboard) */}
        <Route path="/painel" element={<Dashboard />} />
        <Route path="/painel/editar-perfil" element={<EditProfile />} />
        <Route path="/painel/premium" element={<Premium />} />
        <Route path="/painel/configuracoes" element={<Settings />} />
        
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;