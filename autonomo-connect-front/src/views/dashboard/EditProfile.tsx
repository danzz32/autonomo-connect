import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save } from "lucide-react";

export function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Editar Perfil</h1>
          <p className="text-slate-500">
            Mantenha suas informações atualizadas para atrair clientes.
          </p>
        </header>

        <form onSubmit={handleSave} className="max-w-4xl space-y-6">
          {/* Foto e Capa */}
          <Card>
            <CardHeader>
              <CardTitle>Sua Imagem</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" type="button">
                  Alterar Foto
                </Button>
                <p className="text-xs text-slate-500">
                  JPG ou PNG. Máximo 2MB.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dados Básicos */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Profissionais</CardTitle>
              <CardDescription>
                Isso é o que os clientes verão na busca.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input defaultValue="Carlos Silva" />
                </div>
                <div className="space-y-2">
                  <Label>Preço por Hora (R$)</Label>
                  <Input type="number" defaultValue="80" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sobre Você</Label>
                <Textarea
                  className="h-32"
                  defaultValue="Especialista em serviços elétricos residenciais com mais de 5 anos de experiência. Faço instalações, reparos e manutenção."
                />
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card>
            <CardHeader>
              <CardTitle>Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input
                    defaultValue="carlos@exemplo.com"
                    disabled
                    className="bg-slate-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input defaultValue="(11) 99999-9999" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
            <Button disabled={isLoading} className="gap-2">
              {isLoading ? (
                "Salvando..."
              ) : (
                <>
                  <Save size={16} /> Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
