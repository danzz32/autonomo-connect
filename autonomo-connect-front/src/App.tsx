import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { AuthWorker } from "@/pages/AuthWorker";
import { SearchPage } from "@/pages/Search";
import { Profile } from "@/pages/Profile";
import { HowItWorks } from "@/pages/HowItWorks"; // Importação do novo componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/como-funciona" element={<HowItWorks />} />{" "}
        {/* <--- Nova rota */}
        <Route path="/sou-profissional" element={<AuthWorker />} />
        <Route path="/busca" element={<SearchPage />} />
        <Route path="/perfil/:slug" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
