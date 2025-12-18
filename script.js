let result = document.getElementById('result');

// Add click animation to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    });
});

function append(value) {
    if (result.value === 'Error') {
        result.value = '';
    }
    // Prevent multiple operators in sequence
    const lastChar = result.value.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar) && ['+', '-', '*', '/', '%'].includes(value)) {
        result.value = result.value.slice(0, -1) + value;
    } else {
        result.value += value;
    }
}

function clearResult() {
    result.value = '';
    result.classList.add('clear-animation');
    setTimeout(() => {
        result.classList.remove('clear-animation');
    }, 300);
}

function deleteLast() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace % with /100 for percentage calculations
        let expression = result.value.replace(/%/g, '/100');
        // Evaluate and round to 8 decimal places to avoid floating point issues
        let answer = eval(expression);
        result.value = Math.round(answer * 100000000) / 100000000;
    } catch {
        result.value = 'Error';
        result.classList.add('error-animation');
        setTimeout(() => {
            result.classList.remove('error-animation');
        }, 300);
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
        append(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        append(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearResult();
    }
});
