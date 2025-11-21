import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  MapPin,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  HardHat,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

// --- MOCK DATA (Integrado para evitar erros de importação) ---

const CATEGORIAS = [
  {
    id: 1,
    slug: "encanador",
    nome: "Encanador",
    icon: Wrench,
    color: "bg-blue-500",
  },
  {
    id: 2,
    slug: "eletricista",
    nome: "Eletricista",
    icon: Zap,
    color: "bg-yellow-500",
  },
  {
    id: 3,
    slug: "pintor",
    nome: "Pintor",
    icon: Paintbrush,
    color: "bg-pink-500",
  },
  {
    id: 4,
    slug: "marceneiro",
    nome: "Marceneiro",
    icon: Hammer,
    color: "bg-orange-500",
  },
  {
    id: 5,
    slug: "pedreiro",
    nome: "Pedreiro",
    icon: HardHat,
    color: "bg-slate-500",
  },
  {
    id: 6,
    slug: "faxina",
    nome: "Faxina",
    icon: Sparkles,
    color: "bg-purple-500",
  },
];

const PROFISSIONAIS_DESTAQUE = [
  {
    id: 1,
    slug: "joao-silva",
    nome: "João Silva",
    profissao: "Encanador Master",
    rating: 4.9,
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    slug: "maria-oliveira",
    nome: "Maria Oliveira",
    profissao: "Eletricista Residencial",
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: 3,
    slug: "carlos-souza",
    nome: "Carlos Souza",
    profissao: "Pintor e Acabamentos",
    rating: 4.8,
    avatar: "https://i.pravatar.cc/150?u=3",
  },
];

// --- FRAMER MOTION VARIANTS ---

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

// --- COMPONENTE HOME ---

export function Home() {
  const navigate = useNavigate();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* HEADER COM GLASSMORPHISM */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-9 h-9 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">O</span>
            </motion.div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              ObraFácil
            </span>
          </div>

          <nav className="hidden md:flex gap-2">
            <Link to="/como-funciona">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-orange-600 hover:bg-orange-50"
              >
                Como funciona
              </Button>
            </Link>
            <Link to="/suporte">
              <Button
                variant="ghost"
                className="text-slate-600 hover:text-orange-600 hover:bg-orange-50 gap-2"
              >
                <HelpCircle size={16} /> Suporte
              </Button>
            </Link>
            <div className="w-px h-6 bg-slate-200 mx-2 my-auto" />
            <Link to="/sou-profissional">
              <Button variant="ghost" className="font-medium text-slate-900">
                Sou Profissional
              </Button>
            </Link>
            <Link to="/sou-cliente">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all">
                Sou Cliente
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* HERO SECTION COM GRID BACKGROUND */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Padrão de fundo decorativo */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size[24px_24px]"></div>
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-orange-50/50 via-slate-50 to-white"></div>

          <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1.5 text-sm bg-white/50 backdrop-blur border-orange-200 text-orange-700 shadow-sm rounded-full"
              >
                ✨ A plataforma #1 de serviços locais
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]"
            >
              Contrate especialistas <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500">
                sem dor de cabeça.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Conectamos você aos melhores profissionais da sua região.
              Segurança no pagamento e satisfação garantida.
            </motion.p>

            {/* SEARCH BAR DINÂMICA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`
                relative flex flex-col sm:flex-row gap-2 max-w-xl mx-auto p-2 rounded-2xl border transition-all duration-300
                ${
                  isSearchFocused
                    ? "bg-white shadow-2xl shadow-orange-500/10 ring-2 ring-orange-500/20 border-orange-200"
                    : "bg-white/80 shadow-lg border-slate-200"
                }
              `}
            >
              <div className="relative flex-1 group">
                <Search
                  className={`absolute left-4 top-3.5 h-5 w-5 transition-colors ${
                    isSearchFocused ? "text-orange-500" : "text-slate-400"
                  }`}
                />
                <Input
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Do que você precisa hoje? (ex: Pintor, Faxina...)"
                  className="pl-12 h-12 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
                />
              </div>
              <Button
                size="lg"
                className="h-12 px-8 rounded-xl font-semibold bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 transition-all hover:scale-105 active:scale-95"
              >
                Buscar
              </Button>
            </motion.div>

            {/* SOCIAL PROOF / TRUST BADGES */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />{" "}
                Profissionais Verificados
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> Orçamento
                Grátis
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> Pagamento
                Seguro
              </div>
            </motion.div>
          </div>
        </section>

        {/* CATEGORIAS */}
        <section className="py-20 container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                Categorias Populares
              </h3>
              <p className="text-slate-500 mt-2">
                Encontre exatamente o que sua casa precisa.
              </p>
            </div>
            <Button
              variant="link"
              className="text-orange-600 font-semibold hidden md:flex group"
            >
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {CATEGORIAS.map((cat) => (
              <motion.div key={cat.id} variants={itemVariants}>
                <Card
                  onClick={() => navigate(`/busca?categoria=${cat.slug}`)}
                  className="group relative overflow-hidden border-slate-100 hover:border-orange-200 transition-all cursor-pointer hover:shadow-xl hover:shadow-orange-500/5 bg-white"
                >
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="flex flex-col items-center justify-center p-6 gap-4 relative z-10">
                    <div
                      className={`p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${cat.color} bg-opacity-10`}
                    >
                      <cat.icon
                        size={32}
                        className="text-slate-700 group-hover:text-slate-900"
                      />
                    </div>
                    <span className="font-semibold text-slate-600 group-hover:text-orange-600 transition-colors text-center">
                      {cat.nome}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* DESTAQUES / PROFISSIONAIS */}
        <section className="py-20 bg-slate-900 text-slate-50 rounded-t-[3rem] mt-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white mb-3 border-0">
                  Em alta na Semana
                </Badge>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Profissionais em Alta
                </h3>
                <p className="text-slate-400 mt-2 text-lg">
                  Os talentos mais elogiados da comunidade esta semana.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-slate-900 text-orange-600 hover:bg-slate-800 hover:text-white hidden md:flex"
              >
                Ver a lista Completa
              </Button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {PROFISSIONAIS_DESTAQUE.map((prof) => (
                <motion.div key={prof.id} variants={itemVariants}>
                  <Card
                    onClick={() => navigate(`/perfil/${prof.slug}`)}
                    className="border-0 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800 transition-all duration-300 cursor-pointer group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-14 w-14 border-2 border-slate-700 group-hover:border-orange-500 transition-colors">
                              <AvatarImage src={prof.avatar} />
                              <AvatarFallback className="bg-slate-700 text-white">
                                {prof.nome[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-800"
                              title="Online agora"
                            ></div>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-white group-hover:text-orange-400 transition-colors">
                              {prof.nome}
                            </h4>
                            <p className="text-sm text-slate-400">
                              {prof.profissao}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20 text-orange-400 text-sm font-bold">
                            <Star
                              size={14}
                              className="fill-orange-500 text-orange-500 mr-1"
                            />
                            {prof.rating}
                          </div>
                          <span className="text-xs text-slate-500 mt-1">
                            120 jobs
                          </span>
                        </div>
                      </div>

                      <div className="h-px w-full bg-slate-700/50 mb-4" />

                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1 text-slate-500" />{" "}
                          São Paulo, SP
                        </div>
                        <span className="text-white font-medium">R$ 150/h</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION CTA (CONVITE) - Agora com Link para /sou-profissional */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-linear-to-r from-orange-600 to-red-500 rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden shadow-2xl shadow-orange-900/20">
              {/* Elementos decorativos (círculos) */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl text-white">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Você é um profissional?
                  </h2>
                  <p className="text-orange-50 text-lg mb-8">
                    Junte-se a mais de 10.000 especialistas que estão crescendo
                    seus negócios com a ObraFácil. Planos iniciais que cabem no
                    seu bolso, seu futuro começa aqui!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* LINK CORRIGIDO PARA A ROTA DO PROFISSIONAL */}
                    <Link to="/sou-profissional">
                      <Button
                        size="lg"
                        className="bg-white text-orange-600 hover:bg-slate-100 font-bold border-0 h-14 px-8 text-lg"
                      >
                        Começar Agora
                      </Button>
                    </Link>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-orange-600 hover:bg-white/10 h-14 px-8 text-lg"
                    >
                      Simular Ganhos
                    </Button>
                  </div>
                </div>
                {/* Ilustração ou Imagem poderia vir aqui */}
                <div className="hidden lg:block p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-400"></div>
                    <div className="h-3 w-32 bg-white/20 rounded"></div>
                  </div>
                  <div className="h-2 w-48 bg-white/10 rounded mb-2"></div>
                  <div className="h-2 w-40 bg-white/10 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-50 text-slate-500 border-t border-slate-200 py-12 text-sm">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center text-white text-xs font-bold">
                O
              </div>
              <span className="font-bold text-slate-900">ObraFácil</span>
            </div>
            <p className="mb-4">
              Facilitando a conexão entre quem precisa e quem sabe fazer.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Carreiras
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Imprensa
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Descubra</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Segurança
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600 transition-colors">
                  Guia de preços
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <Input placeholder="Seu e-mail" className="bg-white" />
              <Button className="bg-slate-900 text-white">OK</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 text-center border-t pt-8 text-slate-400">
          © 2025 ObraFácil Tecnologia Ltda. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
