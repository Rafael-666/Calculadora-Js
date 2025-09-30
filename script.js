// Garante que o script só vai rodar depois que todo o HTML for carregado.
document.addEventListener('DOMContentLoaded', () => {
    const visor = document.getElementById('visor');
    const historico = document.getElementById('historico');
    const botoesNumero = document.querySelectorAll('.numero');
    const botoesOperador = document.querySelectorAll('.operador');
    const botaoIgual = document.getElementById('igual');
    const botaoLimpar = document.getElementById('limpar');
    const botaoLimparUltimo = document.getElementById('limparUltimo');
    const botaoInverteOperacao = document.getElementById('inverteOperacao');
    const botaoVirgula = document.getElementById('virgulas');

    //Strings para conseguir utilizar na manipulacao do HTML
    let numeroAtual = '';
    let numeroAnterior = '';
    let operacao = null;

    //Funcao que concatena os numeros e atualiza visor
    function numeros(numero) {
        numeroAtual += numero.textContent;
        visor.textContent = numeroAtual;
    };

    //Identifica qual botao dos numeros foi clicado e chama a funcao numeros
    botoesNumero.forEach(numero => {
        numero.addEventListener('click', () => numeros(numero))
    });

    //Botoes de operadores da calculadora
    botoesOperador.forEach(botao => {
        botao.addEventListener('click', () => {
            if (numeroAtual === '') return; // Não permite operaçao sem numero
            numeroAnterior = numeroAtual;
            numeroAtual = '';
            operacao = botao.textContent;
        });
    });

    //Funcao que calcula todas as operacoes e controla o historico do visor
    function calcular() {
        if (numeroAnterior === '' || numeroAtual === '' || operacao === null) return;

        const a = parseFloat(numeroAnterior.replace(',', '.'));
        const b = parseFloat(numeroAtual.replace(',', '.'));
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
                resultado = b !== 0 ? a / b : 'Erro'; // se o segundo numero for 0 cancela operacao
                break;
            case '%':
                resultado = a * (b / 100);
                break;
            default:
                resultado = 'Inválido';
        }

        //Concatena o calculo anterior do visor para fazer o historico
        const calculoAnterior = `${a} ${operacao} ${b} =`;
        document.getElementById('historico').innerText = calculoAnterior;
        document.getElementById('visor').innerText = resultado;

        // Adaptao o ponto para virgula no visor
        numeroAtual = resultado.toString().replace('.', ',');
        visor.textContent = numeroAtual;

        //limpa o visor para a proxima operacao
        numeroAnterior = '';
        operacao = null;
    };

    // TECLA ENTER e = para mostrar o resultado
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === '=') {
            calcular();
            event.preventDefault(); // evita o comportamento padrão do browser
        }
    });

    // BOTAO de = da calculadora para mostrar o resultado
    botaoIgual.addEventListener('click', calcular);

    function limpaTudo() {
        numeroAtual = '';
        numeroAnterior = '';
        operacao = null;
        visor.textContent = '0';
        historico.innerText = '';
        expressao = '';
    };

    // Botão C limpa tudo da calculadora
    botaoLimpar.addEventListener('click', limpaTudo);

    //Tecla ESC do teclado para limpar tudo
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            limpaTudo();
            event.preventDefault();
        }
    });

    // Funcao para limpar o numero atual no visor
    function limparNumeroAtual() {
        numeroAtual = '';
        visor.textContent = '0';
    }

    // BOTAO calculadora
    botaoLimparUltimo.addEventListener('click', limparNumeroAtual);

    //TECLA  backspace
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace') {
            limparNumeroAtual();
            event.preventDefault();
        }
    });

    //Funcao que inverte o sinal do numero atual
    function inverteOperacao() {
        const b = parseFloat(numeroAtual);
        let resultado = b * -1;
        numeroAtual = resultado.toString();
        visor.textContent = numeroAtual;
    };

    //Botao da calculadora para inverter o sinal
    botaoInverteOperacao.addEventListener('click', inverteOperacao);

    //Botao de virgula da calculadora
    botaoVirgula.addEventListener('click', () => {
        if (numeroAtual.includes(',')) return;
        if (numeroAtual === '') {
            numeroAtual = '0,';
        } else {
            numeroAtual += ',';
        }
        visor.textContent = numeroAtual;
    });
});

