
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, Shield, Info, X, Clock, CheckCircle } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  description: string;
  type: "critical" | "warning" | "info" | "success";
  source: string;
  timestamp: string;
  read: boolean;
  acknowledged: boolean;
  actionRequired: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Vulnérabilité critique détectée",
    description: "CVE-2024-1234: Exploitation à distance possible sur le serveur web principal",
    type: "critical",
    source: "Scanner de vulnérabilités",
    timestamp: "2024-06-10 15:30",
    read: false,
    acknowledged: false,
    actionRequired: true
  },
  {
    id: "2",
    title: "Tentative d'intrusion bloquée",
    description: "IP 185.220.101.42 a tenté d'accéder à SSH avec 127 tentatives de connexion",
    type: "warning",
    source: "IDS/IPS",
    timestamp: "2024-06-10 14:45",
    read: true,
    acknowledged: false,
    actionRequired: true
  },
  {
    id: "3",
    title: "Scan de vulnérabilités terminé",
    description: "Analyse complète du réseau 192.168.1.0/24 terminée avec succès",
    type: "success",
    source: "Scanner automatique",
    timestamp: "2024-06-10 13:20",
    read: true,
    acknowledged: true,
    actionRequired: false
  },
  {
    id: "4",
    title: "Certificat SSL expirant",
    description: "Le certificat SSL de app.company.com expire dans 15 jours",
    type: "warning",
    source: "Monitoring SSL",
    timestamp: "2024-06-10 12:00",
    read: false,
    acknowledged: false,
    actionRequired: true
  },
  {
    id: "5",
    title: "Mise à jour de sécurité disponible",
    description: "Nouvelles mises à jour critiques disponibles pour Windows Server 2019",
    type: "info",
    source: "Gestionnaire de patches",
    timestamp: "2024-06-10 10:15",
    read: true,
    acknowledged: false,
    actionRequired: true
  }
];

export const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<string>("all");

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case "info": return <Info className="h-5 w-5 text-blue-400" />;
      case "success": return <CheckCircle className="h-5 w-5 text-green-400" />;
      default: return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "border-l-red-500 bg-red-900/10";
      case "warning": return "border-l-yellow-500 bg-yellow-900/10";
      case "info": return "border-l-blue-500 bg-blue-900/10";
      case "success": return "border-l-green-500 bg-green-900/10";
      default: return "border-l-gray-500 bg-gray-900/10";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "critical": return "bg-red-600";
      case "warning": return "bg-yellow-600";
      case "info": return "bg-blue-600";
      case "success": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, read: true } : alert
    ));
  };

  const acknowledge = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true, read: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const filteredAlerts = filter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const criticalCount = alerts.filter(alert => alert.type === "critical").length;
  const actionRequiredCount = alerts.filter(alert => alert.actionRequired && !alert.acknowledged).length;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Bell className="h-6 w-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Système d'Alertes</h2>
            {unreadCount > 0 && (
              <Badge className="bg-red-600 text-white">{unreadCount}</Badge>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-slate-600" size="sm">
              Marquer tout comme lu
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" size="sm">
              Configurer Alertes
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{alerts.length}</div>
              <div className="text-slate-400 text-sm">Total Alertes</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{criticalCount}</div>
              <div className="text-slate-400 text-sm">Critiques</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{unreadCount}</div>
              <div className="text-slate-400 text-sm">Non Lues</div>
            </div>
          </Card>
          <Card className="bg-slate-700 border-slate-600 p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{actionRequiredCount}</div>
              <div className="text-slate-400 text-sm">Action Requise</div>
            </div>
          </Card>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-orange-600" : "border-slate-600"}
          >
            Toutes ({alerts.length})
          </Button>
          <Button
            variant={filter === "critical" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("critical")}
            className={filter === "critical" ? "bg-red-600" : "border-slate-600"}
          >
            Critiques ({alerts.filter(a => a.type === "critical").length})
          </Button>
          <Button
            variant={filter === "warning" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("warning")}
            className={filter === "warning" ? "bg-yellow-600" : "border-slate-600"}
          >
            Avertissements ({alerts.filter(a => a.type === "warning").length})
          </Button>
          <Button
            variant={filter === "info" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("info")}
            className={filter === "info" ? "bg-blue-600" : "border-slate-600"}
          >
            Info ({alerts.filter(a => a.type === "info").length})
          </Button>
          <Button
            variant={filter === "success" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("success")}
            className={filter === "success" ? "bg-green-600" : "border-slate-600"}
          >
            Succès ({alerts.filter(a => a.type === "success").length})
          </Button>
        </div>

        {/* Liste des alertes */}
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`bg-slate-700 border-slate-600 border-l-4 p-4 ${getAlertColor(alert.type)} ${!alert.read ? 'ring-1 ring-slate-500' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium ${!alert.read ? 'text-white' : 'text-slate-300'}`}>
                        {alert.title}
                      </h4>
                      <Badge className={getBadgeColor(alert.type)}>
                        {alert.type}
                      </Badge>
                      {!alert.read && (
                        <Badge className="bg-blue-600 text-xs">Nouveau</Badge>
                      )}
                      {alert.actionRequired && !alert.acknowledged && (
                        <Badge className="bg-orange-600 text-xs">Action requise</Badge>
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>{alert.source}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.timestamp}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!alert.read && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-slate-600 text-xs"
                      onClick={() => markAsRead(alert.id)}
                    >
                      Marquer lu
                    </Button>
                  )}
                  {alert.actionRequired && !alert.acknowledged && (
                    <Button 
                      size="sm" 
                      className="bg-orange-600 hover:bg-orange-700 text-xs"
                      onClick={() => acknowledge(alert.id)}
                    >
                      Traiter
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-slate-400 hover:text-white"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    <X className="h-4 w-4" />
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
