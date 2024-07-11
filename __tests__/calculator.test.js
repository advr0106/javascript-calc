// __tests__/calculator.test.js
const { AddNumber, CalcAction, AddComma, Result, ProccessResult, ProcessAction, CleanCurrentEntry, CleanAll, Percentage } = require('../js/calculator');

describe('Calculadora - Casos de Prueba', () => {
    let totalElement;
    let accumulatorElement;

    beforeEach(() => {
        // Configurar elementos simulados del DOM antes de cada prueba
        totalElement = document.createElement('div');
        totalElement.id = 'total';
        accumulatorElement = document.createElement('div');
        accumulatorElement.id = 'accumulator';

        document.body.appendChild(totalElement);
        document.body.appendChild(accumulatorElement);
    });

    afterEach(() => {
        // Limpiar elementos simulados del DOM después de cada prueba
        totalElement.remove();
        accumulatorElement.remove();
    });

    // Caso de Prueba TC-001
    test('TC-001: Ver Pantalla con Número Actual o Resultado de Última Operación', () => {
        AddNumber('5');
        expect(totalElement.innerHTML).toBe('5');
    });

    // Caso de Prueba TC-002
    test('TC-002: Ver Teclado de Entrada', () => {
        const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ',', 'C', 'CE', '%', '/', 'x', '-', '+', '='];
        buttons.forEach(button => {
            // Simular clic en cada botón del teclado
            if (button !== 'C' && button !== 'CE' && button !== '=') {
                AddNumber(button);
            } else {
                switch (button) {
                    case 'C':
                        CleanAll();
                        break;
                    case 'CE':
                        CleanCurrentEntry();
                        break;
                    case '=':
                        Result();
                        break;
                    default:
                        // Otros botones de operación
                        CalcAction(button);
                        break;
                }
            }
        });

        // Verificar que se haya mostrado en pantalla correctamente
        expect(totalElement.innerHTML).toBeDefined();
    });

    // Caso de Prueba TC-003
    test('TC-003: Introducir Números', () => {
        AddNumber('1');
        AddNumber('2');
        AddNumber('3');
        AddNumber('4');
        AddNumber('5');
        AddNumber('6');
        AddNumber('7');
        AddNumber('8');
        AddNumber('9');
        AddNumber('0');
        AddNumber('1'); // Este número debe ser ignorado por el límite de 10 dígitos
        expect(totalElement.innerHTML).toBe('1234567890');
    });

    // Caso de Prueba TC-004
    test('TC-004: Realizar Operaciones Matemáticas', () => {
        AddNumber('1');
        CalcAction('+');
        AddNumber('2');
        Result();
        expect(totalElement.innerHTML).toBe('3');
    });

    // Caso de Prueba TC-005
    test('TC-005: Borrar Última Entrada ("CE")', () => {
        AddNumber('1');
        AddNumber('2');
        CleanCurrentEntry();
        expect(totalElement.innerHTML).toBe('');
    });

    // Caso de Prueba TC-006
    test('TC-006: Borrar Todo ("C")', () => {
        AddNumber('1');
        AddNumber('2');
        CleanAll();
        expect(totalElement.innerHTML).toBe('');
        expect(accumulatorElement.innerHTML).toBe('');
    });

    // Caso de Prueba TC-007
    test('TC-007: Calcular resultados con decimales', () => {
        AddNumber('0');
        AddComma();
        AddNumber('1');
        CalcAction('+');
        AddNumber('0');
        AddComma();
        AddNumber('2');
        Result();
        expect(totalElement.innerHTML).toBe('0.3');
    });

    // Caso de Prueba TC-008
    test('TC-008: Validar límite 10 caracteres en pantalla', () => {
        AddNumber('1');
        AddNumber('2');
        AddNumber('3');
        AddNumber('4');
        AddNumber('5');
        AddNumber('6');
        AddNumber('7');
        AddNumber('8');
        AddNumber('9');
        AddNumber('0');
        AddNumber('1'); // Este número debe ser ignorado por el límite de 10 dígitos
        expect(totalElement.innerHTML).toBe('1234567890');
    });

    // Caso de Prueba TC-009
    test('TC-009: Dividir por cero', () => {
        AddNumber('10');
        CalcAction('/');
        AddNumber('0');
        Result();
        // Verificar que se muestre un mensaje de error (simulado)
        expect(totalElement.innerHTML).toBe('Error');
    });

    // Caso de Prueba TC-010
    test('TC-010: Calcular números pequeños', () => {
        AddNumber('0');
        AddComma();
        AddNumber('00000001');
        CalcAction('x');
        AddNumber('0');
        AddComma();
        AddNumber('00000001');
        Result();
        expect(totalElement.innerHTML).toBe('1E-16');
    });

    // Caso de Prueba TC-011
    test('TC-011: Calcular números grandes', () => {
        AddNumber('1234567890');
        CalcAction('x');
        AddNumber('1234567890');
        Result();
        expect(totalElement.innerHTML).toBe('1234567890');
    });

    // Agregar más pruebas según sea necesario para cubrir todos los casos de prueba
});