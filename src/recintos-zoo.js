class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['MACACO'], tamanhoAtual: 1 },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [], tamanhoAtual: 0 },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['GAZELA'], tamanhoAtual: 2 },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [], tamanhoAtual: 0 },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['LEAO'], tamanhoAtual: 3 }
        ];

        this.animais = [
            { nome: 'LEAO', tamanho: 3, bioma: ['savana'], carnivoro: true },
            { nome: 'LEOPARDO', tamanho: 2, bioma: ['savana'], carnivoro: true },
            { nome: 'CROCODILO', tamanho: 3, bioma: ['rio'], carnivoro: true },
            { nome: 'MACACO', tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            { nome: 'GAZELA', tamanho: 2, bioma: ['savana'], carnivoro: false },
            { nome: 'HIPOPOTAMO', tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        ];
    }

    analisaRecintos(animal, quantidade) {
        const animaisValidos = this.animais.map(a => a.nome);
        if (!animaisValidos.includes(animal)) {
            return { erro: 'Animal inválido', recintosViaveis: false };
        }
    
        const quantidadeInteira = parseInt(quantidade, 10);
        if (isNaN(quantidadeInteira) || quantidadeInteira <= 0) {
            return { erro: 'Quantidade inválida', recintosViaveis: false };
        }
    
        const animalInfo = this.animais.find(a => a.nome === animal);
    
        const recintosViaveis = this.recintos.filter(recinto => {
            const biomaCompativel = animalInfo.bioma.includes(recinto.bioma);
            let espacoRestante = recinto.tamanho - recinto.tamanhoAtual;
    
            if (!biomaCompativel) {
                return false;
            }
    
            if (animalInfo.carnivoro && recinto.animais.length > 0 && !recinto.animais.includes(animal)) {
                return false;
            }
    
            if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
                return false;
            }
    
            if (animal === 'MACACO' && recinto.animais.length === 0) {
                return false;
            }
    
            let espacoNecessario = animalInfo.tamanho * quantidadeInteira;
    
            if (recinto.animais.length > 0 && !recinto.animais.includes(animal)) {
                espacoNecessario += 1;
            }
    
            return espacoRestante >= espacoNecessario;
        }).map(recinto => {

            const espacoLivre = recinto.tamanho - (recinto.tamanhoAtual + animalInfo.tamanho * quantidadeInteira);
            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
        });
    
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável', recintosViaveis: false };
        }
    
        return { recintosViaveis };
    }
}    

export { RecintosZoo };

