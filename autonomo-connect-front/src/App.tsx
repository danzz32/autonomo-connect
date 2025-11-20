import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { AuthWorker } from "@/pages/AuthWorker";
import { SearchPage } from "@/pages/Search";
import { Profile } from "@/pages/Profile";
import { HowItWorks } from "@/pages/HowItWorks";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { EditProfile } from "@/pages/dashboard/EditProfile";
import { Premium } from "@/pages/dashboard/Premium";
import { Settings } from "@/pages/dashboard/Settings";
import { NotFound } from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/como-funciona" element={<HowItWorks />} />
        <Route path="/sou-profissional" element={<AuthWorker />} />
        <Route path="/busca" element={<SearchPage />} />
        <Route path="/perfil/:slug" element={<Profile />} />
        <Route path="/painel" element={<Dashboard />} />
        <Route path="/painel/editar-perfil" element={<EditProfile />} />
        <Route path="/painel/premium" element={<Premium />} />
        <Route path="/painel/configuracoes" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
