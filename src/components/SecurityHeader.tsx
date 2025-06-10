
import { Shield, Bell, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const SecurityHeader = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">SecuriAI</span>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400">
              Système Actif
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Bell className="h-5 w-5" />
              <Badge className="ml-2 bg-red-600 text-white">3</Badge>
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
