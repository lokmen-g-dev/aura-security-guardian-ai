
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, Shield, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  totalControls: number;
  implementedControls: number;
  compliance: number;
  lastAssessment: string;
  nextReview: string;
  status: "compliant" | "partial" | "non-compliant";
}

interface ComplianceControl {
  id: string;
  framework: string;
  controlId: string;
  title: string;
  description: string;
  status: "implemented" | "partial" | "not-implemented" | "not-applicable";
  evidence: string[];
  lastReview: string;
  responsible: string;
}

const frameworks: ComplianceFramework[] = [
  {
    id: "iso27001",
    name: "ISO 27001",
    description: "Système de management de la sécurité de l'information",
    totalControls: 114,
    implementedControls: 105,
    compliance: 92,
    lastAssessment: "2024-03-15",
    nextReview: "2024-09-15",
    status: "compliant"
  },
  {
    id: "gdpr",
    name: "RGPD",
    description: "Règlement Général sur la Protection des Données",
    totalControls: 99,
    implementedControls: 77,
    compliance: 78,
    lastAssessment: "2024-04-20",
    nextReview: "2024-10-20",
    status: "partial"
  },
  {
    id: "pcidss",
    name: "PCI DSS",
    description: "Payment Card Industry Data Security Standard",
    totalControls: 12,
    implementedControls: 8,
    compliance: 67,
    lastAssessment: "2024-02-10",
    nextReview: "2024-08-10",
    status: "non-compliant"
  },
  {
    id: "soc2",
    name: "SOC 2",
    description: "Service Organization Control 2",
    totalControls: 64,
    implementedControls: 61,
    compliance: 95,
    lastAssessment: "2024-05-01",
    nextReview: "2024-11-01",
    status: "compliant"
  }
];

const controls: ComplianceControl[] = [
  {
    id: "1",
    framework: "ISO 27001",
    controlId: "A.5.1.1",
    title: "Politique de sécurité de l'information",
    description: "Une politique de sécurité de l'information doit être définie, approuvée par la direction",
    status: "implemented",
    evidence: ["Politique SI v2.1", "Approbation direction", "Formation équipes"],
    lastReview: "2024-03-15",
    responsible: "CISO"
  },
  {
    id: "2",
    framework: "RGPD",
    controlId: "Art. 25",
    title: "Protection des données dès la conception",
    description: "Mise en œuvre de mesures techniques et organisationnelles appropriées",
    status: "partial",
    evidence: ["Procédures DPO", "Formation développeurs"],
    lastReview: "2024-04-20",
    responsible: "DPO"
  },
  {
    id: "3",
    framework: "PCI DSS",
    controlId: "Req. 1",
    title: "Installer et maintenir une configuration de pare-feu",
    description: "Pare-feu et routeurs sécurisés pour protéger les données de cartes",
    status: "not-implemented",
    evidence: [],
    lastReview: "2024-02-10",
    responsible: "Équipe Réseau"
  }
];

export const ComplianceManagement = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-600";
      case "partial": return "bg-yellow-600";
      case "non-compliant": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getControlStatusColor = (status: string) => {
    switch (status) {
      case "implemented": return "bg-green-600";
      case "partial": return "bg-yellow-600";
      case "not-implemented": return "bg-red-600";
      case "not-applicable": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
      case "implemented": return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "partial": return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case "non-compliant":
      case "not-implemented": return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case "not-applicable": return <Clock className="h-5 w-5 text-gray-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredControls = selectedFramework === "all" 
    ? controls 
    : controls.filter(control => control.framework === selectedFramework);

  const overallCompliance = Math.round(
    frameworks.reduce((sum, framework) => sum + framework.compliance, 0) / frameworks.length
  );

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FileCheck className="h-6 w-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Gestion de la Conformité</h2>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Nouvel Audit
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700 border-slate-600">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="frameworks" className="text-white data-[state=active]:bg-purple-600">
              Référentiels
            </TabsTrigger>
            <TabsTrigger value="controls" className="text-white data-[state=active]:bg-purple-600">
              Contrôles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Métriques globales */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-700 border-slate-600 p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{overallCompliance}%</div>
                  <div className="text-slate-400 text-sm">Conformité Globale</div>
                  <Progress value={overallCompliance} className="mt-2" />
                </div>
              </Card>
              <Card className="bg-slate-700 border-slate-600 p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {frameworks.filter(f => f.status === "compliant").length}
                  </div>
                  <div className="text-slate-400 text-sm">Conformes</div>
                </div>
              </Card>
              <Card className="bg-slate-700 border-slate-600 p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {frameworks.filter(f => f.status === "partial").length}
                  </div>
                  <div className="text-slate-400 text-sm">Partiels</div>
                </div>
              </Card>
              <Card className="bg-slate-700 border-slate-600 p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {frameworks.filter(f => f.status === "non-compliant").length}
                  </div>
                  <div className="text-slate-400 text-sm">Non-conformes</div>
                </div>
              </Card>
            </div>

            {/* Tableau de bord des référentiels */}
            <Card className="bg-slate-700 border-slate-600 p-6">
              <h3 className="text-xl font-semibold text-white mb-4">État des Référentiels</h3>
              <div className="space-y-4">
                {frameworks.map((framework) => (
                  <div key={framework.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(framework.status)}
                      <div>
                        <h4 className="text-white font-medium">{framework.name}</h4>
                        <p className="text-slate-400 text-sm">{framework.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-400 mt-1">
                          <span>Dernière évaluation: {framework.lastAssessment}</span>
                          <span>Prochaine revue: {framework.nextReview}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{framework.compliance}%</div>
                        <Progress value={framework.compliance} className="w-20 mt-1" />
                      </div>
                      <Badge className={getStatusColor(framework.status)}>
                        {framework.implementedControls}/{framework.totalControls}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="frameworks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {frameworks.map((framework) => (
                <Card key={framework.id} className="bg-slate-700 border-slate-600 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{framework.name}</h3>
                      <p className="text-slate-400 text-sm mb-3">{framework.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Contrôles implémentés:</span>
                          <span className="text-white">{framework.implementedControls}/{framework.totalControls}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Dernière évaluation:</span>
                          <span className="text-white">{framework.lastAssessment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Prochaine revue:</span>
                          <span className="text-white">{framework.nextReview}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(framework.status)}>
                      {framework.compliance}%
                    </Badge>
                  </div>
                  <Progress value={framework.compliance} className="mb-4" />
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline" className="border-slate-600">
                      Détails
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Évaluer
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="controls" className="space-y-6">
            {/* Filtres */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedFramework === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFramework("all")}
                className={selectedFramework === "all" ? "bg-purple-600" : "border-slate-600"}
              >
                Tous ({controls.length})
              </Button>
              {frameworks.map(framework => (
                <Button
                  key={framework.id}
                  variant={selectedFramework === framework.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFramework(framework.name)}
                  className={selectedFramework === framework.name ? "bg-purple-600" : "border-slate-600"}
                >
                  {framework.name} ({controls.filter(c => c.framework === framework.name).length})
                </Button>
              ))}
            </div>

            {/* Liste des contrôles */}
            <div className="space-y-4">
              {filteredControls.map((control) => (
                <Card key={control.id} className="bg-slate-700 border-slate-600 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(control.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-medium">{control.controlId}</h4>
                          <Badge variant="outline" className="border-slate-500 text-slate-300">
                            {control.framework}
                          </Badge>
                        </div>
                        <h5 className="text-slate-300 mb-2">{control.title}</h5>
                        <p className="text-slate-400 text-sm mb-2">{control.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <span>Responsable: {control.responsible}</span>
                          <span>Dernière revue: {control.lastReview}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getControlStatusColor(control.status)}>
                      {control.status}
                    </Badge>
                  </div>
                  
                  {control.evidence.length > 0 && (
                    <div className="mb-3">
                      <h6 className="text-slate-400 text-sm mb-1">Preuves:</h6>
                      <div className="flex flex-wrap gap-1">
                        {control.evidence.map((evidence, index) => (
                          <Badge key={index} variant="outline" className="border-slate-500 text-slate-300 text-xs">
                            {evidence}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline" className="border-slate-600">
                      Modifier
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Évaluer
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
