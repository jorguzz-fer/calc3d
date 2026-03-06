import React from 'react';
import { Settings, Droplet, Zap, Wrench, DollarSign } from 'lucide-react';

export default function SettingsPanel({ settings, updateSetting }) {
    const formatKey = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

    const Section = ({ title, icon: Icon, children }) => (
        <div className="glass-panel" style={{ marginBottom: '24px' }}>
            <div className="panel-header">
                <Icon size={20} className="text-accent" />
                {title}
            </div>
            <div className="grid-3">
                {children}
            </div>
        </div>
    );

    const InputRow = ({ label, valueKey, prefix = '', suffix = '' }) => (
        <div className="input-group">
            <label className="input-label">{label || formatKey(valueKey)}</label>
            <div className="input-wrapper">
                {prefix && <span className="input-prefix">{prefix}</span>}
                <input
                    type="number"
                    step="0.01"
                    className={`app-input ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`}
                    value={settings[valueKey]}
                    onChange={(e) => updateSetting(valueKey, e.target.value)}
                />
                {suffix && <span className="input-suffix">{suffix}</span>}
            </div>
        </div>
    );

    return (
        <div className="settings-panel animate-fade-in">

            <Section title="Custos Fixos Mensais" icon={Settings}>
                <InputRow valueKey="aluguel" prefix="R$" />
                <InputRow valueKey="assinaturas" prefix="R$" />
                <InputRow valueKey="plataformas" prefix="R$" />
                <InputRow valueKey="taxaMEI" prefix="R$" />
                <InputRow valueKey="publicidade" prefix="R$" />
                <InputRow valueKey="condominio" prefix="R$" />
                <div className="col-span-full section-divider"></div>
                <InputRow label="Faturamento Previsto/Mês" valueKey="faturamentoPrevisto" prefix="R$" />
            </Section>

            <Section title="Máquina & Insumos" icon={Zap}>
                <InputRow label="Preço Kg Filamento" valueKey="kgFilamento" prefix="R$" />
                <InputRow label="Potência Impressora" valueKey="potenciaImpressora" suffix="W" />
                <InputRow label="Custo Energia KWh" valueKey="custoKWh" prefix="R$" />
                <InputRow label="Custo Embalagem/Envio" valueKey="embalagem" prefix="R$" />
            </Section>

            <Section title="Amortização do Equipamento" icon={Wrench}>
                <InputRow label="Valor Máquina" valueKey="valorImpressora" prefix="R$" />
                <InputRow label="Vida Útil Est." valueKey="vidaUtilMeses" suffix="meses" />
            </Section>

            <Section title="Custos de Pintura" icon={Droplet}>
                <InputRow label="Tinta Simples" valueKey="tintaSimples" prefix="R$" />
                <InputRow label="Tinta Média" valueKey="tintaMedia" prefix="R$" />
                <InputRow label="Tinta Complexa" valueKey="tintaComplexa" prefix="R$" />

                <InputRow label="Valor do Spray" valueKey="valorSpray" prefix="R$" />
                <InputRow label="Rendimento Spray" valueKey="qtdPecasSpray" suffix="pçs" />

                <div className="col-span-full section-divider"></div>

                <InputRow label="Tempo Ref. Simples" valueKey="horaSimples" suffix="h" />
                <InputRow label="Tempo Ref. Média" valueKey="horaMedia" suffix="h" />
                <InputRow label="Tempo Ref. Comp." valueKey="horaComplexa" suffix="h" />
                <InputRow label="Valor Mão de Obra" valueKey="custoHora" prefix="R$/h" />
            </Section>
        </div>
    );
}
