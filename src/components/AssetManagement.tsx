
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Server, Network, Monitor, Smartphone, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: "server" | "network" | "application" | "endpoint";
  criticality: "critical" | "high" | "medium" | "low";
  status: "online" | "offline" | "maintenance";
  ip: string;
  lastScan: string;
  vulnerabilities: number;
  owner: string;
}

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "Serveur Web Principal",
    type: "server",
    criticality: "critical",
    status: "online",
    ip: "192.168.1.10",
    lastScan: "2024-06-10 14:30",
    vulnerabilities: 3,
    owner: "Équipe Infrastructure"
  },
  {
    id: "2",
    name: "Base de Données CRM",
    type: "server",
    criticality: "critical",
    status: "online",
    ip: "192.168.1.15",
    lastScan: "2024-06-10 12:15",
    vulnerabilities: 1,
    owner: "Équipe Développement"
  },
  {
    id: "3",
    name: "Application Mobile",
    type: "application",
    criticality: "high",
    status: "online",
    ip: "N/A",
    lastScan: "2024-06-09 16:45",
    vulnerabilities: 5,
    owner: "Équipe Mobile"
  },
  {
    id: "4",
    name: "Réseau DMZ",
    type: "network",
    criticality: "high",
    status: "online",
    ip: "10.0.1.0/24",
    lastScan: "2024-06-10 10:00",
    vulnerabilities: 2,
    owner: "Équipe Réseau"
  }
];

export const AssetManagement = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCriticality, setFilterCriticality] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getAssetIcon = (type: string) => {
    switch (type) {
      case "server": return <Server className="h-5 w-5" />;
      case "network": return <Network className="h-5 w-5" />;
      case "application": return <Monitor className="h-5 w-5" />;
      case "endpoint": return <Smartphone className="h-5 w-5" />;
      default: return <Server className="h-5 w-5" />;
    }
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "offline": return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "maintenance": return <Shield className="h-4 w-4 text-yellow-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesType = filterType === "all" || asset.type === filterType;
    const matchesCriticality = filterCriticality === "all" || asset.criticality === filterCriticality;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.ip.includes(searchTerm) ||
                         asset.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesCriticality && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Server className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Gestion des Actifs</h2>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Ajouter un Actif
          </Button>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{assets.length}</div>
              <div className="text-slate-400 text-sm">Total Actifs</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {assets.filter(a => a.status === "online").length}
              </div>
              <div className="text-slate-400 text-sm">En Ligne</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {assets.filter(a => a.criticality === "critical").length}
              </div>
              <div className="text-slate-400 text-sm">Critiques</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {assets.reduce((sum, asset) => sum + asset.vulnerabilities, 0)}
              </div>
              <div className="text-slate-400 text-sm">Vulnérabilités</div>
            </div>
          </Card>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Rechercher un actif..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs bg-slate-700 border-slate-600 text-white"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous types</SelectItem>
              <SelectItem value="server">Serveurs</SelectItem>
              <SelectItem value="network">Réseaux</SelectItem>
              <SelectItem value="application">Applications</SelectItem>
              <SelectItem value="endpoint">Terminaux</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCriticality} onValueChange={setFilterCriticality}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Criticité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="critical">Critique</SelectItem>
              <SelectItem value="high">Élevée</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="low">Faible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Liste des actifs */}
        <div className="space-y-4">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="bg-slate-700 border-slate-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getAssetIcon(asset.type)}
                    <div>
                      <h4 className="text-white font-medium">{asset.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <span>{asset.ip}</span>
                        <span>•</span>
                        <span>{asset.owner}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(asset.status)}
                    <Badge className={getCriticalityColor(asset.criticality)}>
                      {asset.criticality}
                    </Badge>
                    {asset.vulnerabilities > 0 && (
                      <Badge className="bg-red-600">
                        {asset.vulnerabilities} vulnérabilités
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-sm">
                    Dernier scan: {asset.lastScan}
                  </span>
                  <Button size="sm" variant="outline" className="border-slate-600">
                    Scanner
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Détails
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
