import { useState, useEffect } from 'react';

const defaultSettings = {
  // Custo Fixo
  aluguel: 210.00,
  assinaturas: 95.00,
  plataformas: 59.90,
  taxaMEI: 60.00,
  publicidade: 100.00,
  condominio: 100.00,
  faturamentoPrevisto: 4000.00,

  // Maquina e variaveis
  kgFilamento: 90.00,
  potenciaImpressora: 350,
  custoKWh: 1.14,
  embalagem: 0.00,

  // Amortização
  valorImpressora: 7300.00,
  vidaUtilMeses: 24,

  // Pintura
  tintaSimples: 2.00,
  tintaMedia: 4.00,
  tintaComplexa: 6.00,
  valorSpray: 35.00,
  qtdPecasSpray: 20,

  // Mão de obra (Pintura)
  horaSimples: 1,
  horaMedia: 4,
  horaComplexa: 5,
  custoHora: 10.00,
};

const defaultJob = {
  quantidade: 1,
  tempoImpressao: 23,
  pesoEstimado: 600,
  markup: 2.5,
  nivelPintura: 'Nenhuma', // 'Nenhuma', 'Simples', 'Média', 'Complexa'
};

export function useCalculator() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('calc3d_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [job, setJob] = useState(() => {
    const saved = localStorage.getItem('calc3d_job');
    return saved ? JSON.parse(saved) : defaultJob;
  });

  useEffect(() => {
    localStorage.setItem('calc3d_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('calc3d_job', JSON.stringify(job));
  }, [job]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: Number(value) }));
  };

  const updateJob = (key, value) => {
    setJob(prev => ({ ...prev, [key]: value }));
  };

  // --- CALCULOS MACRO ---
  const totalAmortizacao = settings.valorImpressora / settings.vidaUtilMeses;
  const totalCustoFixo = settings.aluguel + settings.assinaturas + settings.plataformas +
    settings.taxaMEI + settings.publicidade + settings.condominio + totalAmortizacao;

  const custoFixoDissolvido = settings.faturamentoPrevisto > 0
    ? totalCustoFixo / settings.faturamentoPrevisto
    : 0;

  // --- CUSTOS DIRETOS ---
  const pesoTotalEmGramas = job.pesoEstimado * (job.quantidade || 1);
  const custoFilamento = (pesoTotalEmGramas / 1000) * settings.kgFilamento;
  const custoEnergia = (settings.potenciaImpressora / 1000) * job.tempoImpressao * settings.custoKWh;
  const custosDiretos = custoFilamento + custoEnergia + settings.embalagem;

  // --- CUSTOS INDIRETOS E FALHAS ---
  const custosIndiretos = custosDiretos * custoFixoDissolvido;
  const percentualFalhas = (custosDiretos + custosIndiretos) * 0.10;

  // --- CUSTO TOTAL PRODUTO ---
  const custoTotalProduto = custosDiretos + custosIndiretos + percentualFalhas;

  // --- PINTURA ---
  let custoPintura = 0;
  if (job.nivelPintura !== 'Nenhuma') {
    const primer = settings.valorSpray / settings.qtdPecasSpray;
    const verniz = settings.valorSpray / settings.qtdPecasSpray;

    let tintaItem = 0;
    let horasItem = 0;

    if (job.nivelPintura === 'Simples') {
      tintaItem = settings.tintaSimples;
      horasItem = settings.horaSimples;
    } else if (job.nivelPintura === 'Média') {
      tintaItem = settings.tintaMedia;
      horasItem = settings.horaMedia;
    } else if (job.nivelPintura === 'Complexa') {
      tintaItem = settings.tintaComplexa;
      horasItem = settings.horaComplexa;
    }

    custoPintura = primer + verniz + tintaItem + (horasItem * settings.custoHora);
  }

  // --- PREÇO FINAL ---
  const custoAbsoluto = custoTotalProduto + custoPintura;
  const precoFinalCliente = custoAbsoluto * job.markup;
  const lucroTotal = precoFinalCliente - custoAbsoluto;

  // --- MARKETPLACES ---
  // A planilha usa a taxa de 20% + 4 fixos para a Shopee. 
  // Formula = (Valor_Final / (1 - 0.20)) + 4 -> Repassa ao cliente
  const precosShopee = (precoFinalCliente / (1 - 0.20)) + 4;

  // Mercado livre 19%
  const precosML = precoFinalCliente / (1 - 0.19);

  // --- UNITARIOS ---
  const qty = Math.max(1, job.quantidade || 1);
  const custoUnitario = custoAbsoluto / qty;
  const precoFinalUnitario = precoFinalCliente / qty;
  const lucroUnitario = lucroTotal / qty;

  return {
    settings,
    job,
    updateSetting,
    updateJob,
    results: {
      totalAmortizacao,
      totalCustoFixo,
      custoFixoDissolvido,
      custosDiretos,
      custosIndiretos,
      percentualFalhas,
      custoTotalProduto,
      custoPintura,
      custoAbsoluto,
      precoFinalCliente,
      lucroTotal,
      precosShopee,
      precosML,
      custoUnitario,
      precoFinalUnitario,
      lucroUnitario
    }
  };
}
