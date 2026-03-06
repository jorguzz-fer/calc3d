import React, { useState } from 'react';
import { useCalculator } from './hooks/useCalculator';
import SettingsPanel from './components/SettingsPanel';
import CalculatorPanel from './components/CalculatorPanel';
import { Settings2, Calculator } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('calc');
  const { settings, job, updateSetting, updateJob, results } = useCalculator();

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-title animate-fade-in">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white mr-2 shadow-lg shadow-blue-500/30">
            3D
          </div>
          CalcXtreme
        </div>

        <div className="tabs animate-fade-in">
          <button
            className={`tab-btn ${activeTab === 'calc' ? 'active' : ''}`}
            onClick={() => setActiveTab('calc')}
          >
            <Calculator size={16} />
            Calculadora
          </button>
          <button
            className={`tab-btn ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            <Settings2 size={16} />
            Configurações
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'calc' ? (
          <CalculatorPanel job={job} updateJob={updateJob} results={results} />
        ) : (
          <SettingsPanel settings={settings} updateSetting={updateSetting} />
        )}
      </main>

      <footer className="text-center text-sm text-gray-500 mt-12 mb-4 animate-fade-in">
        Baseado na planilha original de custos • Precificação inteligente
      </footer>
    </div>
  );
}
