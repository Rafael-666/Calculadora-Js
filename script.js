const visor = document.getElementById('visor');
const botoesNumero = document.querySelectorAll('.numero');
const botoesOperador = document.querySelectorAll('.operador');
const botaoIgual = document.getElementById('igual');
const botaoLimpar = document.getElementById('limpar');

/*Strings para conseguir utilizar no calculo*/
let numeroAtual = '';
let numeroAnterior = '';
let operacao = null;


/* O query selector vai pegar todos da class numero e o forEach vai percorrer cada um individualmente em busca do que foi clicado naquele momento*/
botoesNumero.forEach(botao => {
     botao.addEventListener('click', () => {
          numeroAtual += botao.textContent;
          visor.textContent = numeroAtual;
     });
});

botoesOperador.forEach(botao => {
     botao.addEventListener('click', () => {
          if (numeroAtual === '') return; // Não permite operaçao sem numero
          numeroAnterior = numeroAtual;
          numeroAtual = '';
          operacao = botao.textContent;
     });
});

botaoIgual.addEventListener('click', () => {
     if (numeroAnterior === '' || numeroAtual === '' || operacao === null) return;
 
     const a = parseFloat(numeroAnterior);
     const b = parseFloat(numeroAtual);
     let resultado;
 
     switch (operacao) {
         case '+':
             resultado = a + b;
             break;
         case '-':
             resultado = a - b;
             break;
         case 'x':
             resultado = a * b;
             break;
         case '÷':
             resultado = b !== 0 ? a / b : 'Erro';
             break;
         default:
             resultado = 'Inválido';
     }
 
     visor.textContent = resultado;
     // Mantem o resultado do calculo anterior mas limpa a operação e o primeiro numero
     numeroAtual = resultado.toString();
     numeroAnterior = '';
     operacao = null;
 });

// Botão C limpa tudo
botaoLimpar.addEventListener('click', () => {
     numeroAtual = '';
     numeroAnterior = '';
     operacao = null;
     visor.textContent = '0';
});