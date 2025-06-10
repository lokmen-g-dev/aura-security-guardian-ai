
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sword, Target, Shield, AlertTriangle, CheckCircle, Play, Pause, Square } from "lucide-react";

interface PenetrationTest {
  id: string;
  name: string;
  target: string;
  type: "network" | "web" | "wireless" | "social";
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  startTime: string;
  endTime?: string;
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  tools: string[];
}

const mockTests: PenetrationTest[] = [
  {
    id: "1",
    name: "Test d'intrusion réseau complet",
    target: "192.168.1.0/24",
    type: "network",
    status: "completed",
    progress: 100,
    startTime: "2024-06-10 09:00",
    endTime: "2024-06-10 12:30",
    findings: { critical: 2, high: 5, medium: 8, low: 12 },
    tools: ["Nmap", "Metasploit", "Nessus"]
  },
  {
    id: "2",
    name: "Audit sécurité application web",
    target: "https://app.company.com",
    type: "web",
    status: "running",
    progress: 65,
    startTime: "2024-06-10 14:00",
    findings: { critical: 1, high: 3, medium: 5, low: 7 },
    tools: ["OWASP ZAP", "Burp Suite", "SQLmap"]
  },
  {
    id: "3",
    name: "Test sécurité Wi-Fi",
    target: "Corporate-WiFi",
    type: "wireless",
    status: "pending",
    progress: 0,
    startTime: "2024-06-10 16:00",
    findings: { critical: 0, high: 0, medium: 0, low: 0 },
    tools: ["Aircrack-ng", "Kismet", "Reaver"]
  },
  {
    id: "4",
    name: "Simulation phishing",
    target: "Employés département IT",
    type: "social",
    status: "completed",
    progress: 100,
    startTime: "2024-06-09 08:00",
    endTime: "2024-06-09 18:00",
    findings: { critical: 0, high: 2, medium: 3, low: 1 },
    tools: ["GoPhish", "SET", "Custom Scripts"]
  }
];

export const PenetrationTesting = () => {
  const [tests, setTests] = useState<PenetrationTest[]>(mockTests);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "running": return <Play className="h-5 w-5 text-blue-400" />;
      case "pending": return <Pause className="h-5 w-5 text-yellow-400" />;
      case "failed": return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <Square className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return <Badge className="bg-green-600">Terminé</Badge>;
      case "running": return <Badge className="bg-blue-600">En cours</Badge>;
      case "pending": return <Badge className="bg-yellow-600">En attente</Badge>;
      case "failed": return <Badge className="bg-red-600">Échec</Badge>;
      default: return <Badge className="bg-gray-600">Inconnu</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "network": return <Target className="h-5 w-5 text-blue-400" />;
      case "web": return <Shield className="h-5 w-5 text-green-400" />;
      case "wireless": return <AlertTriangle className="h-5 w-5 text-purple-400" />;
      case "social": return <Sword className="h-5 w-5 text-orange-400" />;
      default: return <Target className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesType = filterType === "all" || test.type === filterType;
    const matchesStatus = filterStatus === "all" || test.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const totalFindings = tests.reduce((acc, test) => ({
    critical: acc.critical + test.findings.critical,
    high: acc.high + test.findings.high,
    medium: acc.medium + test.findings.medium,
    low: acc.low + test.findings.low
  }), { critical: 0, high: 0, medium: 0, low: 0 });

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Sword className="h-6 w-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Tests d'Intrusion</h2>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            Nouveau Test
          </Button>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{tests.length}</div>
              <div className="text-slate-400 text-sm">Tests Totaux</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{totalFindings.critical}</div>
              <div className="text-slate-400 text-sm">Critiques</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{totalFindings.high}</div>
              <div className="text-slate-400 text-sm">Élevées</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{totalFindings.medium}</div>
              <div className="text-slate-400 text-sm">Moyennes</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{totalFindings.low}</div>
              <div className="text-slate-400 text-sm">Faibles</div>
            </div>
          </Card>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous types</SelectItem>
              <SelectItem value="network">Réseau</SelectItem>
              <SelectItem value="web">Application Web</SelectItem>
              <SelectItem value="wireless">Sans-fil</SelectItem>
              <SelectItem value="social">Social Engineering</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="running">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
              <SelectItem value="failed">Échec</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Liste des tests */}
        <div className="space-y-4">
          {filteredTests.map((test) => (
            <Card key={test.id} className="bg-slate-700 border-slate-600 p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {getTypeIcon(test.type)}
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{test.name}</h4>
                    <p className="text-slate-400 text-sm mb-2">Cible: {test.target}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-slate-400">Début: {test.startTime}</span>
                      {test.endTime && (
                        <span className="text-slate-400">Fin: {test.endTime}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(test.status)}
                  <Badge variant="outline" className="border-slate-500 text-slate-300">
                    {test.type}
                  </Badge>
                </div>
              </div>

              {/* Barre de progression */}
              {test.status === "running" && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Progression</span>
                    <span className="text-white">{test.progress}%</span>
                  </div>
                  <Progress value={test.progress} className="h-2" />
                </div>
              )}

              {/* Résultats */}
              {(test.status === "completed" || test.status === "running") && (
                <div className="mb-4">
                  <h5 className="text-white font-medium mb-2">Vulnérabilités détectées:</h5>
                  <div className="flex space-x-4">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                      Critiques: {test.findings.critical}
                    </span>
                    <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs">
                      Élevées: {test.findings.high}
                    </span>
                    <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">
                      Moyennes: {test.findings.medium}
                    </span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                      Faibles: {test.findings.low}
                    </span>
                  </div>
                </div>
              )}

              {/* Outils utilisés */}
              <div className="mb-4">
                <h5 className="text-slate-400 text-sm mb-1">Outils:</h5>
                <div className="flex flex-wrap gap-1">
                  {test.tools.map((tool, index) => (
                    <Badge key={index} variant="outline" className="border-slate-500 text-slate-300 text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                {test.status === "pending" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-1" />
                    Démarrer
                  </Button>
                )}
                {test.status === "running" && (
                  <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                    <Pause className="h-4 w-4 mr-1" />
                    Suspendre
                  </Button>
                )}
                {test.status === "completed" && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Rapport Détaillé
                  </Button>
                )}
                <Button size="sm" variant="outline" className="border-slate-600">
                  Paramètres
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
