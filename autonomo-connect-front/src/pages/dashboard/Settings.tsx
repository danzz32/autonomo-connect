import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function Settings() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
          <p className="text-slate-500">
            Gerencie segurança e preferências da conta.
          </p>
        </header>

        <div className="max-w-3xl space-y-6">
          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Escolha como você quer ser avisado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novas avaliações</Label>
                  <p className="text-xs text-slate-500">
                    Receba um email quando alguém te avaliar.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dicas semanais</Label>
                  <p className="text-xs text-slate-500">
                    Receba dicas para melhorar seu perfil.
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nova Senha</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirmar Nova Senha</Label>
                <Input type="password" />
              </div>
              <Button variant="outline" className="mt-2">
                Atualizar Senha
              </Button>
            </CardContent>
          </Card>

          {/* Zona de Perigo */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-800 mb-4">
                Ao excluir sua conta, todos os seus dados, avaliações e
                histórico serão perdidos permanentemente.
              </p>
              <Button variant="destructive">Excluir minha conta</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
