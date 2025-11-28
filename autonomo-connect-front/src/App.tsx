import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/views/Home";
import { Support } from "@/views/Support";
import { AuthWorker } from "@/views/AuthWorker";
import { SearchPage } from "@/views/Search";
import { Profile } from "@/views/Profile";
import { HowItWorks } from "@/views/HowItWorks";
import { Dashboard } from "@/views/dashboard/Dashboard";
import { EditProfile } from "@/views/dashboard/EditProfile";
import { Premium } from "@/views/dashboard/Premium";
import { Settings } from "@/views/dashboard/Settings";
import { NotFound } from "@/views/NotFound";
import { ClientLandingPage } from "@/views/user/ClientLandingPage";
import { ClientRegister } from "@/views/user/ClientRegister";
import { ClientLogin } from "@/views/user/ClientLogin"; // Importação adicionada
import { ForgotPassword } from "@/views/user/ForgotPassword"; // Importação adicionada

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
        {/* Rotas de Autenticação do Cliente */}
        <Route path="/ClientLogin" element={<ClientLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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