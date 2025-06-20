document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const passwordLengthRange = document.getElementById('passwordLength');
    const lengthValueSpan = document.getElementById('lengthValue');
    const includeSymbolsCheckbox = document.getElementById('includeSymbols');
    const includeUppercaseCheckbox = document.getElementById('includeUppercase');
    const includeLowercaseCheckbox = document.getElementById('includeLowercase');
    const includeNumbersCheckbox = document.getElementById('includeNumbers');
    const numPasswordsInput = document.getElementById('numPasswords');
    const generateButton = document.getElementById('generateButton');

    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    // Actualiza el valor de la longitud mostrada cuando el slider se mueve
    passwordLengthRange.addEventListener('input', () => {
        lengthValueSpan.textContent = passwordLengthRange.value;
    });

    // Función principal para generar una contraseña
    function generatePassword(length, includeSym, includeUpper, includeLower, includeNum) {
        let characterPool = '';
        if (includeSym) characterPool += symbols;
        if (includeUpper) characterPool += uppercaseChars;
        if (includeLower) characterPool += lowercaseChars;
        if (includeNum) characterPool += numbers;

        // Asegurarse de que al menos una opción esté seleccionada
        if (characterPool.length === 0) {
            alert('Por favor, selecciona al menos un tipo de carácter para generar la contraseña.');
            return '';
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characterPool.length);
            password += characterPool[randomIndex];
        }
        return password;
    }

    // Función para regenerar contraseñas
    function regeneratePasswords() {
        const length = parseInt(passwordLengthRange.value);
        const includeSymbols = includeSymbolsCheckbox.checked;
        const includeUppercase = includeUppercaseCheckbox.checked;
        const includeLowercase = includeLowercaseCheckbox.checked;
        const includeNumbers = includeNumbersCheckbox.checked;
        const numPasswordsToGenerate = parseInt(numPasswordsInput.value);

        if (!(includeSymbols || includeUppercase || includeLowercase || includeNumbers)) {
            alert('Debes seleccionar al menos un tipo de carácter para generar contraseñas.');
            passwordDisplay.value = ''; // Limpia el área de texto si no hay opciones seleccionadas
            return;
        }

        let generatedPasswords = [];
        for (let i = 0; i < numPasswordsToGenerate; i++) {
            generatedPasswords.push(generatePassword(length, includeSymbols, includeUppercase, includeLowercase, includeNumbers));
        }
        
        passwordDisplay.value = generatedPasswords.join('\n');

        // Ajustar la altura del textarea dinámicamente
        // Se multiplica por la cantidad de contraseñas + 1 (para un poco de padding o si hay una sola linea)
        // y se limita entre un min y max para evitar que sea demasiado grande o pequeño.
        const lineHeight = 20; // Aproximadamente 20px por línea de texto
        const minHeight = 120; // Altura mínima inicial
        const maxHeight = 300; // Altura máxima
        const desiredHeight = (numPasswordsToGenerate * lineHeight) + lineHeight * 2; // + 2 líneas para padding visual
        passwordDisplay.style.height = `${Math.max(minHeight, Math.min(maxHeight, desiredHeight))}px`;
    }

    // Evento para el botón de generar/regenerar
    generateButton.addEventListener('click', regeneratePasswords);

    // Generar contraseñas al cargar la página por primera vez
    regeneratePasswords();
});