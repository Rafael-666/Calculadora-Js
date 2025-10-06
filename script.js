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
        numeroAtual += numero;
        visor.textContent = numeroAtual;
    };

    //Identifica qual botao dos numeros foi clicado e chama a funcao numeros
    botoesNumero.forEach(numero => {
        numero.addEventListener('click', () => numeros(numero.textContent))
    });

    function operadores(operador) {
        if (numeroAtual === '') return; // Não permite operaçao sem numero
        numeroAnterior = numeroAtual;
        numeroAtual = '';
        operacao = operador.textContent;

    };

    //Botoes de operadores da calculadora
    botoesOperador.forEach(operador => {
        operador.addEventListener('click', () => operadores(operador))

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

    // Recebe um evento para se usar no onEventHandler
    const mostrarResultado = (event) => {
        calcular();
        event.preventDefault(); // evita o comportamento padrão do browser
    }

    // Recebe um evento para se usar no onEventHandler
    const backSpace = (event) => {
        limparNumeroAtual();
    };

    // Funcao para limpar o numero atual no visor
    function limparNumeroAtual() {
        numeroAtual = '';
        visor.textContent = '0';
    };

    //Funcao para apagar todos os dados
    function limpaTudo() {
        numeroAtual = '';
        numeroAnterior = '';
        operacao = null;
        visor.textContent = '0';
        historico.innerText = '';
        event.preventDefault();
    };

    //Funcao que inverte o sinal do numero atual
    function inverteOperacao() {
        const b = parseFloat(numeroAtual);
        let resultado = b * -1;
        numeroAtual = resultado.toString();
        visor.textContent = numeroAtual;
    };

    // Botão C limpa tudo da calculadora
    botaoLimpar.addEventListener('click', limpaTudo);

    //Botao de = da calculadora
    botaoIgual.addEventListener('click', calcular);

    // Botao CE da calculadora
    botaoLimparUltimo.addEventListener('click', limparNumeroAtual);

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

   
    //Gerencia as açoes do handler
    const onEventHandler =
    {
        'Enter': mostrarResultado,
        '=': mostrarResultado,
        'Backspace': (event) => {
            backSpace();
        },
        'Escape': (event) => {
            limpaTudo()
        },
        '1': () => numeros(1),
        '2': () => numeros(2),
        '3': () => numeros(3),
        '4': () => numeros(4),
        '5': () => numeros(5),
        '6': () => numeros(6),
        '7': () => numeros(7),
        '8': () => numeros(8),
        '9': () => numeros(9),
        '0': () => numeros(0),
        '+': () => operadores({ textContent: '+' }),
    '-': () => operadores({ textContent: '-' }),
    '*': () => operadores({ textContent: 'x' }),
    '/': () => operadores({ textContent: '÷' }),
    '%': () => operadores({ textContent: '%' }),
    };

    //Identificador de eventos
    document.addEventListener('keydown', function (event) {
        const handler = onEventHandler[event.key]
        if (handler) {
            handler(event);
        }
    });
});

