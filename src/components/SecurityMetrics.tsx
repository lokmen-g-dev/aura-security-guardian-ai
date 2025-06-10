
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Shield, Zap, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const vulnerabilityData = [
  { name: "Lun", critiques: 12, moyennes: 25, faibles: 45 },
  { name: "Mar", critiques: 8, moyennes: 22, faibles: 38 },
  { name: "Mer", critiques: 15, moyennes: 28, faibles: 42 },
  { name: "Jeu", critiques: 6, moyennes: 20, faibles: 35 },
  { name: "Ven", critiques: 10, moyennes: 24, faibles: 40 },
];

const threatDistribution = [
  { name: "Malware", value: 35, color: "#ef4444" },
  { name: "Phishing", value: 25, color: "#f59e0b" },
  { name: "Intrusion", value: 20, color: "#3b82f6" },
  { name: "DDoS", value: 20, color: "#8b5cf6" },
];

export const SecurityMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-red-900 to-red-800 border-red-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-sm font-medium">Vulnérabilités Critiques</p>
            <p className="text-3xl font-bold text-white">23</p>
            <p className="text-red-300 text-sm">+3 depuis hier</p>
          </div>
          <AlertTriangle className="h-12 w-12 text-red-300" />
        </div>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-900 to-yellow-800 border-yellow-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-200 text-sm font-medium">Menaces Bloquées</p>
            <p className="text-3xl font-bold text-white">1,247</p>
            <p className="text-yellow-300 text-sm">Dernière heure</p>
          </div>
          <Shield className="h-12 w-12 text-yellow-300" />
        </div>
      </Card>

      <Card className="bg-gradient-to-r from-blue-900 to-blue-800 border-blue-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm font-medium">Scans Automatiques</p>
            <p className="text-3xl font-bold text-white">156</p>
            <p className="text-blue-300 text-sm">Aujourd'hui</p>
          </div>
          <Zap className="h-12 w-12 text-blue-300" />
        </div>
      </Card>

      <Card className="bg-gradient-to-r from-green-900 to-green-800 border-green-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-200 text-sm font-medium">Score Sécurité</p>
            <p className="text-3xl font-bold text-white">85%</p>
            <Progress value={85} className="mt-2" />
          </div>
          <TrendingUp className="h-12 w-12 text-green-300" />
        </div>
      </Card>

      <Card className="bg-slate-800 border-slate-700 p-6 md:col-span-2">
        <h3 className="text-xl font-semibold text-white mb-4">
          Évolution des Vulnérabilités
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vulnerabilityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#ffffff'
              }} 
            />
            <Bar dataKey="critiques" fill="#ef4444" name="Critiques" />
            <Bar dataKey="moyennes" fill="#f59e0b" name="Moyennes" />
            <Bar dataKey="faibles" fill="#3b82f6" name="Faibles" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="bg-slate-800 border-slate-700 p-6 md:col-span-2">
        <h3 className="text-xl font-semibold text-white mb-4">
          Distribution des Menaces
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={threatDistribution}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {threatDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#ffffff'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
