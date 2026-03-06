import React from 'react';
import { Package, Clock, Banknote, Paintbrush, TrendingUp, Layers, CheckCircle2, Hash } from 'lucide-react';

export default function CalculatorPanel({ job, updateJob, results }) {
    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    const formatPercent = (val) => new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1 }).format(val);

    return (
        <div className="dashboard-layout animate-fade-in">
            {/* Left Column: Inputs */}
            <div className="flex flex-col gap-6 h-max">

                {/* Bloco 1: Parâmetros Unitários */}
                <div className="glass-panel">
                    <h2 className="panel-header mb-6">
                        <Package className="text-accent" />
                        Parâmetros Unitários (1 Peça)
                    </h2>

                    <div className="grid-2 gap-6">
                        <div className="input-group">
                            <label className="input-label flex items-center gap-2">
                                <Clock size={14} /> Tempo Estimado (h)
                            </label>
                            <input
                                type="number"
                                className="app-input"
                                value={job.tempoImpressao}
                                onChange={e => updateJob('tempoImpressao', Number(e.target.value))}
                                min="0"
                                step="0.5"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label flex items-center gap-2">
                                <Layers size={14} /> Peso Estimado (gramas)
                            </label>
                            <input
                                type="number"
                                className="app-input"
                                value={job.pesoEstimado}
                                onChange={e => updateJob('pesoEstimado', Number(e.target.value))}
                                min="0"
                            />
                        </div>

                        <div className="input-group col-span-full">
                            <label className="input-label flex items-center gap-2">
                                <Paintbrush size={14} /> Nível de Pintura
                            </label>
                            <select
                                className="app-input"
                                value={job.nivelPintura}
                                onChange={e => updateJob('nivelPintura', e.target.value)}
                            >
                                <option value="Nenhuma">Sem Pintura</option>
                                <option value="Simples">Simples</option>
                                <option value="Média">Média</option>
                                <option value="Complexa">Complexa</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Bloco 2: Multiplicadores de Lote */}
                <div className="glass-panel">
                    <h2 className="panel-header mb-6">
                        <TrendingUp className="text-green-400" />
                        Multiplicadores e Lote
                    </h2>

                    <div className="grid-2 gap-6">
                        <div className="input-group">
                            <label className="input-label flex items-center gap-2">
                                <Hash size={14} /> Quantidade (Peças)
                            </label>
                            <input
                                type="number"
                                className="app-input"
                                value={job.quantidade || 1}
                                onChange={e => updateJob('quantidade', Number(e.target.value))}
                                min="1"
                                step="1"
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label flex items-center gap-2">
                                <TrendingUp size={14} /> Markup (Multiplicador)
                            </label>
                            <input
                                type="number"
                                className="app-input"
                                value={job.markup}
                                onChange={e => updateJob('markup', Number(e.target.value))}
                                min="1"
                                step="0.1"
                            />
                            <span className="help-text">Lucro sugerido: {job.markup}x o custo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Results */}
            <div className="flex flex-col gap-4">
                <div className="result-card primary">
                    <div className="result-label text-blue-200">Preço Sugerido (TOTAL)</div>
                    <div className="result-value text-3xl">{formatCurrency(results.precoFinalCliente)}</div>
                    {job.quantidade > 1 && (
                        <div className="mt-2 pt-2 border-t border-blue-500/30">
                            <div className="text-blue-100 text-sm">Preço por Unidade: <strong className="text-lg">{formatCurrency(results.precoFinalUnitario)}</strong></div>
                        </div>
                    )}
                    <div className="text-green-400 text-sm font-medium mt-2">
                        + {formatCurrency(results.lucroTotal)} de Lucro Líquido Total
                        {job.quantidade > 1 && ` (${formatCurrency(results.lucroUnitario)}/un.)`}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="result-card">
                        <div className="result-label">Custo Produção Absoluto</div>
                        <div className="result-value text-2xl">{formatCurrency(results.custoAbsoluto)}</div>
                        {job.quantidade > 1 && (
                            <div className="text-gray-400 text-sm mt-1">Unitário: {formatCurrency(results.custoUnitario)}</div>
                        )}
                    </div>
                    <div className="result-card">
                        <div className="result-label">Margem Falhas (10%)</div>
                        <div className="result-value text-2xl">{formatCurrency(results.percentualFalhas)}</div>
                    </div>
                </div>

                <div className="glass-panel p-5 mt-2">
                    <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-accent" />
                        Marketplaces e Repasses
                    </h3>
                    <div className="space-y-3">
                        <div className="breakdown-row">
                            <span className="breakdown-label">Preço Shopee (Taxa 20% + R$4)</span>
                            <span className="breakdown-val text-brand-orange">{formatCurrency(results.precosShopee)}</span>
                        </div>
                        <div className="breakdown-row">
                            <span className="breakdown-label">Preço Mercado Livre (Taxa 19%)</span>
                            <span className="breakdown-val text-yellow-500">{formatCurrency(results.precosML)}</span>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-5">
                    <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                        Detalhamento do Custo
                    </h3>
                    <div className="space-y-3">
                        <div className="breakdown-row">
                            <span className="breakdown-label">Custo Direto (Matéria + Energia)</span>
                            <span className="breakdown-val">{formatCurrency(results.custosDiretos)}</span>
                        </div>
                        <div className="breakdown-row">
                            <span className="breakdown-label">Custo Indireto (Base {formatPercent(results.custoFixoDissolvido)})</span>
                            <span className="breakdown-val">{formatCurrency(results.custosIndiretos)}</span>
                        </div>
                        {results.custoPintura > 0 && (
                            <div className="breakdown-row">
                                <span className="breakdown-label">Custo com Pintura</span>
                                <span className="breakdown-val text-accent">{formatCurrency(results.custoPintura)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
