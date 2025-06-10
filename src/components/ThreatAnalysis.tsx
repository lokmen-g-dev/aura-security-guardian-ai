
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Eye, Shield, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const threatTrendData = [
  { time: "00:00", malware: 12, phishing: 8, intrusion: 5 },
  { time: "04:00", malware: 15, phishing: 12, intrusion: 7 },
  { time: "08:00", malware: 25, phishing: 18, intrusion: 12 },
  { time: "12:00", malware: 30, phishing: 22, intrusion: 15 },
  { time: "16:00", malware: 28, phishing: 20, intrusion: 18 },
  { time: "20:00", malware: 22, phishing: 16, intrusion: 10 },
];

const aiPredictions = [
  {
    id: "1",
    threat: "Attaque par déni de service",
    probability: 85,
    timeframe: "Prochaines 4 heures",
    confidence: "Élevée",
    recommendation: "Activer les protections DDoS avancées"
  },
  {
    id: "2",
    threat: "Tentative de phishing ciblé",
    probability: 72,
    timeframe: "Prochaines 24 heures",
    confidence: "Moyenne",
    recommendation: "Renforcer la formation anti-phishing"
  },
  {
    id: "3",
    threat: "Malware sur endpoint",
    probability: 65,
    timeframe: "Prochains 3 jours",
    confidence: "Moyenne",
    recommendation: "Mise à jour des signatures antivirus"
  }
];

export const ThreatAnalysis = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Brain className="h-6 w-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Analyse Prédictive des Menaces</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-purple-900/20 border-purple-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-8 w-8 text-purple-400" />
              <Badge className="bg-purple-600">IA Active</Badge>
            </div>
            <h3 className="text-lg font-semibold text-white">Surveillance Continue</h3>
            <p className="text-purple-200 text-sm">Analyse comportementale en temps réel</p>
          </Card>
          
          <Card className="bg-blue-900/20 border-blue-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <Badge className="bg-blue-600">Prédiction</Badge>
            </div>
            <h3 className="text-lg font-semibold text-white">Modèles Prédictifs</h3>
            <p className="text-blue-200 text-sm">Anticipation des attaques futures</p>
          </Card>
          
          <Card className="bg-green-900/20 border-green-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <Shield className="h-8 w-8 text-green-400" />
              <Badge className="bg-green-600">Protection</Badge>
            </div>
            <h3 className="text-lg font-semibold text-white">Réponse Automatique</h3>
            <p className="text-green-200 text-sm">Mitigation proactive des risques</p>
          </Card>
        </div>

        <Card className="bg-slate-700 border-slate-600 p-6 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Tendances des Menaces (24h)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={threatTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#ffffff'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="malware" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Malware"
              />
              <Line 
                type="monotone" 
                dataKey="phishing" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Phishing"
              />
              <Line 
                type="monotone" 
                dataKey="intrusion" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Intrusion"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Prédictions IA</h3>
          {aiPredictions.map((prediction) => (
            <Card key={prediction.id} className="bg-slate-700 border-slate-600 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-medium">{prediction.threat}</h4>
                    <Badge 
                      className={`${
                        prediction.probability >= 80 ? 'bg-red-600' :
                        prediction.probability >= 60 ? 'bg-orange-600' :
                        'bg-yellow-600'
                      }`}
                    >
                      {prediction.probability}% de probabilité
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Délai prévu:</span>
                      <div className="text-white">{prediction.timeframe}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Confiance:</span>
                      <div className="text-white">{prediction.confidence}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Recommandation:</span>
                      <div className="text-white">{prediction.recommendation}</div>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="ml-4 bg-blue-600 hover:bg-blue-700">
                  Appliquer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
