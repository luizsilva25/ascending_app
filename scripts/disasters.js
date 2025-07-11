export let disasterList = {
    chuvasIntensas: {
        name: "Chuvas Intensas",
        effect: disasterChuvasIntensas()
    },
    aquecimentoGlobal: {
        name : "Aquecimento Global"
    },
    epidemia: {
        name : "Epidemia"
    },
    condicoesTrabalho: {
        name : "Péssimas Condições de Trabalho"
    },
    ineficaciaEducacional: {
        name : "Ineficácia Educacional"
    },
    pobrezaExtrema: {
        name : "Crescimento da Pobreza Extrema"
    },
    deficitHabitacional: {
        name : "Déficit Habitacional"
    },
    colapsoEnergetico: {
        name : "Colapso Energético"
    },
    escassezAlimentos: {
        name : "Escassez de Alimentos"
    },
    falenciaIndustrial: {
        name : "Falência Industrial"
    },
    poluicaoAr: {
        name : "Poluição Extrema do Ar"
    },
    poluicaoRiosMares: {
        name : "Poluição dos Rios e Mares"
    },
    esgotamentoSolo: {
        name : "Esgotamento do Solo"
    },
    baixaNatalidade: {
        name : "Baixa Natalidade"
    },

}

export function disasterChuvasIntensas() {

}

export let disasterNumber = Object.keys(disasterList).length