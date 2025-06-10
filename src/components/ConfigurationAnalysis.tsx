
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Settings, Shield, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

interface ConfigurationCheck {
  id: string;
  system: string;
  category: string;
  rule: string;
  status: "compliant" | "non-compliant" | "warning" | "pending";
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  recommendation: string;
  lastCheck: string;
}

const mockConfigurations: ConfigurationCheck[] = [
  {
    id: "1",
    system: "Pare-feu Principal",
    category: "Règles de filtrage",
    rule: "SSH (port 22) accessible uniquement depuis le réseau interne",
    status: "compliant",
    severity: "high",
    description: "Le port SSH est correctement restreint au réseau interne",
    recommendation: "Configuration conforme aux bonnes pratiques",
    lastCheck: "2024-06-10 14:30"
  },
  {
    id: "2",
    system: "Serveur Web",
    category: "Configuration SSL/TLS",
    rule: "Utilisation de TLS 1.2 minimum",
    status: "non-compliant",
    severity: "critical",
    description: "Le serveur accepte encore des connexions TLS 1.0 et 1.1",
    recommendation: "Désactiver TLS 1.0 et 1.1, configurer uniquement TLS 1.2+",
    lastCheck: "2024-06-10 13:15"
  },
  {
    id: "3",
    system: "Base de Données",
    category: "Authentification",
    rule: "Comptes par défaut désactivés",
    status: "warning",
    severity: "medium",
    description: "Certains comptes par défaut sont encore présents mais désactivés",
    recommendation: "Supprimer complètement les comptes par défaut non utilisés",
    lastCheck: "2024-06-10 12:45"
  },
  {
    id: "4",
    system: "Active Directory",
    category: "Politique de mots de passe",
    rule: "Longueur minimale de 12 caractères",
    status: "compliant",
    severity: "high",
    description: "La politique impose 12 caractères minimum",
    recommendation: "Configuration conforme",
    lastCheck: "2024-06-10 11:20"
  },
  {
    id: "5",
    system: "Serveur DHCP",
    category: "Configuration réseau",
    rule: "Plage d'adresses IP restreinte",
    status: "pending",
    severity: "medium",
    description: "Vérification en cours de la configuration DHCP",
    recommendation: "En attente de résultats",
    lastCheck: "2024-06-10 15:00"
  }
];

export const ConfigurationAnalysis = () => {
  const [configurations, setConfigurations] = useState<ConfigurationCheck[]>(mockConfigurations);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "non-compliant": return <XCircle className="h-5 w-5 text-red-400" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case "pending": return <Clock className="h-5 w-5 text-blue-400" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "compliant": return <Badge className="bg-green-600">Conforme</Badge>;
      case "non-compliant": return <Badge className="bg-red-600">Non-conforme</Badge>;
      case "warning": return <Badge className="bg-yellow-600">Attention</Badge>;
      case "pending": return <Badge className="bg-blue-600">En cours</Badge>;
      default: return <Badge className="bg-gray-600">Inconnu</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const complianceRate = Math.round(
    (configurations.filter(c => c.status === "compliant").length / configurations.length) * 100
  );

  const categories = [...new Set(configurations.map(c => c.category))];

  const filteredConfigurations = selectedCategory === "all" 
    ? configurations 
    : configurations.filter(c => c.category === selectedCategory);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Settings className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Analyse de Configurations</h2>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            Nouvelle Analyse
          </Button>
        </div>

        {/* Métriques de conformité */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{complianceRate}%</div>
              <div className="text-slate-400 text-sm">Taux de Conformité</div>
              <Progress value={complianceRate} className="mt-2" />
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {configurations.filter(c => c.status === "compliant").length}
              </div>
              <div className="text-slate-400 text-sm">Conformes</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {configurations.filter(c => c.status === "non-compliant").length}
              </div>
              <div className="text-slate-400 text-sm">Non-conformes</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {configurations.filter(c => c.status === "warning").length}
              </div>
              <div className="text-slate-400 text-sm">Avertissements</div>
            </div>
          </Card>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-blue-600" : "border-slate-600"}
          >
            Toutes ({configurations.length})
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-blue-600" : "border-slate-600"}
            >
              {category} ({configurations.filter(c => c.category === category).length})
            </Button>
          ))}
        </div>

        {/* Liste des configurations */}
        <div className="space-y-4">
          {filteredConfigurations.map((config) => (
            <Card key={config.id} className="bg-slate-700 border-slate-600 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(config.status)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-white font-medium">{config.system}</h4>
                      <Badge variant="outline" className="border-slate-500 text-slate-300">
                        {config.category}
                      </Badge>
                    </div>
                    <p className="text-slate-300 mb-2">{config.rule}</p>
                    <p className="text-slate-400 text-sm mb-2">{config.description}</p>
                    <p className="text-blue-400 text-sm">{config.recommendation}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getStatusBadge(config.status)}
                  <Badge className={getSeverityColor(config.severity)}>
                    {config.severity}
                  </Badge>
                  <span className="text-slate-400 text-xs">
                    {config.lastCheck}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline" className="border-slate-600">
                  Détails
                </Button>
                {config.status === "non-compliant" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Corriger
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
