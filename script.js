document.addEventListener('DOMContentLoaded', () => {
    const decimalInput = document.getElementById('decimal-input');
    const romanInput = document.getElementById('roman-input');
    const convertToRomanBtn = document.getElementById('convert-to-roman');
    const convertToDecimalBtn = document.getElementById('convert-to-decimal');
    const outputResult = document.getElementById('output-result');

    const romanNumerals = [
        { value: 1000, symbol: "M" },
        { value: 900, symbol: "CM" },
        { value: 500, symbol: "D" },
        { value: 400, symbol: "CD" },
        { value: 100, symbol: "C" },
        { value: 90, symbol: "XC" },
        { value: 50, symbol: "L" },
        { value: 40, symbol: "XL" },
        { value: 10, symbol: "X" },
        { value: 9, symbol: "IX" },
        { value: 5, symbol: "V" },
        { value: 4, symbol: "IV" },
        { value: 1, symbol: "I" }
    ];

    // Funzione per convertire da decimale a romano
    function decimalToRoman(num) {
        if (num <= 0 || num >= 4000 || !Number.isInteger(num)) {
            return 'Inserire un numero intero tra 1 e 3999';
        }
        let result = '';
        for (const { value, symbol } of romanNumerals) {
            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }
        return result;
    }

    // Funzione per convertire da romano a decimale
    function romanToDecimal(roman) {
        roman = roman.toUpperCase().trim();
        const romanMap = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
        };

        if (!/^[IVXLCDM]+$/i.test(roman)) {
            return 'Inserire un numero romano valido (es. MCMLXXXIV)';
        }

        let result = 0;
        for (let i = 0; i < roman.length; i++) {
            const current = romanMap[roman[i]];
            const next = romanMap[roman[i+1]];

            if (next && current < next) {
                result += next - current;
                i++;
            } else {
                result += current;
            }
        }
        return result;
    }

    // Gestione eventi per i pulsanti
    convertToRomanBtn.addEventListener('click', () => {
        const decimalValue = parseInt(decimalInput.value, 10);
        outputResult.textContent = decimalToRoman(decimalValue);
    });

    convertToDecimalBtn.addEventListener('click', () => {
        const romanValue = romanInput.value;
        outputResult.textContent = romanToDecimal(romanValue);
    });

    // Funzioni per l'aggiornamento automatico
    decimalInput.addEventListener('input', () => {
        const decimalValue = parseInt(decimalInput.value, 10);
        if (decimalValue) {
            outputResult.textContent = decimalToRoman(decimalValue);
        } else {
            outputResult.textContent = '';
        }
    });

    romanInput.addEventListener('input', () => {
        const romanValue = romanInput.value;
        if (romanValue) {
            outputResult.textContent = romanToDecimal(romanValue);
        } else {
            outputResult.textContent = '';
        }
    });
});
