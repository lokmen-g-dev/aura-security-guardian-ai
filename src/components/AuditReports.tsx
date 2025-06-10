
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, CheckCircle, AlertTriangle } from "lucide-react";

const reports = [
  {
    id: "1",
    title: "Rapport de Sécurité Mensuel",
    date: "2024-06-01",
    type: "Complet",
    status: "Généré",
    findings: {
      critical: 5,
      high: 12,
      medium: 23,
      low: 45
    },
    description: "Analyse complète de la posture de sécurité avec recommandations prioritaires"
  },
  {
    id: "2",
    title: "Audit de Conformité RGPD",
    date: "2024-05-28",
    type: "Conformité",
    status: "En cours",
    findings: {
      critical: 2,
      high: 8,
      medium: 15,
      low: 32
    },
    description: "Évaluation de la conformité aux exigences du RGPD"
  },
  {
    id: "3",
    title: "Scan de Vulnérabilités Réseau",
    date: "2024-05-25",
    type: "Technique",
    status: "Généré",
    findings: {
      critical: 8,
      high: 18,
      medium: 35,
      low: 67
    },
    description: "Analyse technique approfondie de l'infrastructure réseau"
  }
];

const complianceStandards = [
  { name: "ISO 27001", status: "Conforme", percentage: 92 },
  { name: "RGPD", status: "Partiel", percentage: 78 },
  { name: "SOC 2", status: "Conforme", percentage: 95 },
  { name: "PCI DSS", status: "Non-conforme", percentage: 65 },
];

export const AuditReports = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Généré":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "En cours":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Conforme":
        return "bg-green-600";
      case "Partiel":
        return "bg-yellow-600";
      case "Non-conforme":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Rapports d'Audit</h2>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            Générer Nouveau Rapport
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-700 border-slate-600 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Conformité Réglementaire</h3>
            <div className="space-y-4">
              {complianceStandards.map((standard, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-medium">{standard.name}</span>
                    <Badge className={getStatusColor(standard.status)}>
                      {standard.status}
                    </Badge>
                  </div>
                  <span className="text-slate-400">{standard.percentage}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-700 border-slate-600 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Statistiques Globales</h3>
            <div className="space-y-4 text-slate-300">
              <div className="flex justify-between items-center">
                <span>Rapports générés ce mois</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Vulnérabilités corrigées</span>
                <span className="text-green-400 font-medium">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Temps moyen de résolution</span>
                <span className="text-white font-medium">2.3 jours</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Score de sécurité moyen</span>
                <span className="text-blue-400 font-medium">8.5/10</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Rapports Récents</h3>
          {reports.map((report) => (
            <Card key={report.id} className="bg-slate-700 border-slate-600 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(report.status)}
                    <h4 className="text-white font-medium">{report.title}</h4>
                    <Badge variant="outline" className="border-slate-500 text-slate-300">
                      {report.type}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-3">{report.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">{report.date}</span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        C: {report.findings.critical}
                      </span>
                      <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs">
                        H: {report.findings.high}
                      </span>
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">
                        M: {report.findings.medium}
                      </span>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        L: {report.findings.low}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button size="sm" variant="outline" className="border-slate-600">
                    Voir
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
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
