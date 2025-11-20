import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Briefcase, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIAS } from "@/mocks/data";

export function AuthWorker() {
  // Estado apenas para simular o carregamento do botão
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de API
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Botão de Voltar */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft size={16} /> Voltar para Home
          </Button>
        </Link>
      </div>

      <div className="mx-5 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Área do Profissional
          </h1>
          <p className="text-slate-500">
            Gerencie seus serviços e conquiste mais clientes.
          </p>
        </div>

        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 gap-3">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastre-se</TabsTrigger>
          </TabsList>

          {/* FORMULÁRIO DE LOGIN */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Acesse sua conta para ver seus pedidos.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input
                      id="email-login"
                      type="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password-login">Senha</Label>
                      <a
                        href="#"
                        className="text-xs text-primary hover:underline"
                      >
                        Esqueceu?
                      </a>
                    </div>
                    <Input id="password-login" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full mt-5" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Acessar Conta"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* FORMULÁRIO DE CADASTRO */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crie sua conta</CardTitle>
                <CardDescription>
                  Divulgue seus serviços gratuitamente.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Ex: João da Silva" required />
                  </div>

                  {/* Contato */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        placeholder="(00) 90000-0000"
                        required
                      />
                    </div>
                  </div>

                  {/* Categoria (Select) */}
                  <div className="space-y-2">
                    <Label>Sua Especialidade Principal</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIAS.map((cat) => (
                          <SelectItem key={cat.id} value={cat.slug}>
                            <div className="flex items-center gap-2">
                              {/* Renderizando ícone se possível, ou apenas texto */}
                              <span>{cat.nome}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Descrição */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Sobre seu trabalho</Label>
                    <Textarea
                      id="bio"
                      placeholder="Descreva sua experiência, tipos de serviço que realiza, etc."
                      className="min-h-[100px]"
                    />
                  </div>

                  {/* Senha */}
                  <div className="space-y-2 mb-5">
                    <Label htmlFor="password">Criar Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      minLength={6}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Criando..."
                    ) : (
                      <>
                        Finalizar Cadastro <CheckCircle2 size={18} />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-center text-slate-500 px-4">
                    Ao se cadastrar, você concorda com nossos Termos de Uso e
                    Política de Privacidade.
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
