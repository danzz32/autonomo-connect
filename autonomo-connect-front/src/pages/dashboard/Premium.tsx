import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Check, Crown } from "lucide-react";

export function Premium() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-2xl font-bold text-slate-900">
            Planos e Assinatura
          </h1>
          <p className="text-slate-500">
            Destaque-se e consiga até 3x mais clientes.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
          {/* Plano Gratuito */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl">Básico</CardTitle>
              <CardDescription>Para quem está começando</CardDescription>
              <div className="text-3xl font-bold mt-4">Grátis</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check size={16} /> Perfil público simples
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} /> Aparece nas buscas
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} /> Recebe contatos ilimitados
                </li>
                <li className="flex items-center gap-2 text-slate-400 line-through">
                  Destaque no topo da lista
                </li>
                <li className="flex items-center gap-2 text-slate-400 line-through">
                  Selo de verificação
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                Plano Atual
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Premium */}
          <Card className="border-amber-400 bg-amber-50/30 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMENDADO
            </div>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-amber-700">
                <Crown size={24} className="fill-amber-500 text-amber-600" />{" "}
                Profissional Pro
              </CardTitle>
              <CardDescription>Para quem quer crescer rápido</CardDescription>
              <div className="text-3xl font-bold mt-4 text-slate-900">
                R$ 29,90{" "}
                <span className="text-sm font-normal text-slate-500">/mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" /> Tudo do plano
                  básico
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" /> 1º lugar nas
                  buscas
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" /> Selo "Destaque"
                  dourado
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" /> Suporte
                  prioritário
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" /> Dashboard
                  avançado
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-md py-6">
                Assinar Agora
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
