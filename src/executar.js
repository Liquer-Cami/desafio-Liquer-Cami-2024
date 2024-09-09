import { RecintosZoo } from './recintos-zoo.js';
import promptSync from 'prompt-sync';

const prompt = promptSync();

function organizacaoZoo() {
    const zoo = new RecintosZoo();

    while (true) {
        const animalQuantidade = prompt('Digite o animal e sua quantidade (Ex: MACACO, 2): ').toUpperCase();
        const [animal, quantidade] = animalQuantidade.split(',').map(item => item.trim());

        const resultado = zoo.analisaRecintos(animal, quantidade);

        if (resultado.erro) {
            console.log(resultado.erro);
            continue; 
        }
        else{
            console.log(resultado)
        }
    }
}

organizacaoZoo();
