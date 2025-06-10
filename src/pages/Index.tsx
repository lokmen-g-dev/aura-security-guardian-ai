
import { useState } from "react";
import { SecurityHeader } from "@/components/SecurityHeader";
import { SecurityMetrics } from "@/components/SecurityMetrics";
import { VulnerabilityScanner } from "@/components/VulnerabilityScanner";
import { ThreatAnalysis } from "@/components/ThreatAnalysis";
import { AuditReports } from "@/components/AuditReports";
import { AssetManagement } from "@/components/AssetManagement";
import { ConfigurationAnalysis } from "@/components/ConfigurationAnalysis";
import { PenetrationTesting } from "@/components/PenetrationTesting";
import { ComplianceManagement } from "@/components/ComplianceManagement";
import { AlertSystem } from "@/components/AlertSystem";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SecurityHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Plateforme d'Audit de Sécurité IA
          </h1>
          <p className="text-slate-300 text-lg">
            Analyse intelligente et détection proactive des vulnérabilités
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-slate-800 border-slate-700">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-blue-600">
              Tableau de Bord
            </TabsTrigger>
            <TabsTrigger value="assets" className="text-white data-[state=active]:bg-blue-600">
              Actifs
            </TabsTrigger>
            <TabsTrigger value="scanner" className="text-white data-[state=active]:bg-blue-600">
              Scanner IA
            </TabsTrigger>
            <TabsTrigger value="config" className="text-white data-[state=active]:bg-blue-600">
              Configurations
            </TabsTrigger>
            <TabsTrigger value="pentest" className="text-white data-[state=active]:bg-blue-600">
              Tests Intrusion
            </TabsTrigger>
            <TabsTrigger value="threats" className="text-white data-[state=active]:bg-blue-600">
              Analyse Menaces
            </TabsTrigger>
            <TabsTrigger value="compliance" className="text-white data-[state=active]:bg-blue-600">
              Conformité
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-white data-[state=active]:bg-blue-600">
              Alertes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <SecurityMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Activité en Temps Réel
                </h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex justify-between items-center">
                    <span>Scans en cours</span>
                    <span className="text-blue-400 font-medium">3 actifs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Dernière détection</span>
                    <span className="text-red-400 font-medium">il y a 2 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Statut système</span>
                    <span className="text-green-400 font-medium">Opérationnel</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tests d'intrusion</span>
                    <span className="text-yellow-400 font-medium">2 en cours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Conformité globale</span>
                    <span className="text-green-400 font-medium">83%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Alertes Récentes
                </h3>
                <div className="space-y-3">
                  <div className="bg-red-900/20 border border-red-800 rounded p-3">
                    <div className="text-red-400 font-medium">Vulnérabilité Critique</div>
                    <div className="text-slate-300 text-sm">CVE-2024-1234 détectée</div>
                  </div>
                  <div className="bg-yellow-900/20 border border-yellow-800 rounded p-3">
                    <div className="text-yellow-400 font-medium">Tentative d'Intrusion</div>
                    <div className="text-slate-300 text-sm">IP suspecte bloquée</div>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-800 rounded p-3">
                    <div className="text-blue-400 font-medium">Test d'Intrusion</div>
                    <div className="text-slate-300 text-sm">Scan réseau terminé</div>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-800 rounded p-3">
                    <div className="text-orange-400 font-medium">Configuration</div>
                    <div className="text-slate-300 text-sm">SSL/TLS non-conforme</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assets">
            <AssetManagement />
          </TabsContent>

          <TabsContent value="scanner">
            <VulnerabilityScanner />
          </TabsContent>

          <TabsContent value="config">
            <ConfigurationAnalysis />
          </TabsContent>

          <TabsContent value="pentest">
            <PenetrationTesting />
          </TabsContent>

          <TabsContent value="threats">
            <ThreatAnalysis />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceManagement />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertSystem />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
