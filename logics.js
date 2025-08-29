 document.addEventListener('DOMContentLoaded', function() {
            // Menu navigation
            const menuButtons = document.querySelectorAll('.menu-btn');
            const contentSections = document.querySelectorAll('.content-section');
            
            let exitCloseTimeout = null;
            
            menuButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const target = this.getAttribute('data-target');
                    
                    // Update active menu button
                    menuButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show target section
                    contentSections.forEach(section => {
                        section.classList.remove('active');
                        if (section.id === target) {
                            section.classList.add('active');
                        }
                    });
                    
                    // Handle delayed close on Exit
                    if (exitCloseTimeout) {
                        clearTimeout(exitCloseTimeout);
                        exitCloseTimeout = null;
                    }
                    if (target === 'exit') {
                        exitCloseTimeout = setTimeout(function() {
                            try {
                                window.open('', '_self');
                                window.close();
                                location.replace('about:blank');
                            } catch (e) {
                                location.replace('about:blank');
                            }
                        }, 3000);
                    }
                });
            });
            
            // Decimal Conversion
            const decimalInput = document.getElementById('decimalInput');
            const convertDecimalBtn = document.getElementById('convertDecimalBtn');
            const decimalResult = document.getElementById('decimalResult');
            const binaryResult = document.getElementById('binaryResult');
            const octalResult = document.getElementById('octalResult');
            const hexResult = document.getElementById('hexResult');
            const decimalError = document.getElementById('decimalError');
            
            convertDecimalBtn.addEventListener('click', function() {
                const value = decimalInput.value.trim();
                
                if (value === '' || isNaN(value) || !Number.isInteger(Number(value))) {
                    decimalError.style.display = 'block';
                    return;
                }
                
                decimalError.style.display = 'none';
                const num = parseInt(value, 10);
                
                decimalResult.textContent = num;
                binaryResult.textContent = num.toString(2);
                octalResult.textContent = num.toString(8);
                hexResult.textContent = num.toString(16).toUpperCase();
            });
            
            // Addition in Any Base
            const firstNumber = document.getElementById('firstNumber');
            const firstBase = document.getElementById('firstBase');
            const secondNumber = document.getElementById('secondNumber');
            const secondBase = document.getElementById('secondBase');
            const addBtn = document.getElementById('addBtn');
            const addDecimalResult = document.getElementById('addDecimalResult');
            const addBinaryResult = document.getElementById('addBinaryResult');
            const addOctalResult = document.getElementById('addOctalResult');
            const addHexResult = document.getElementById('addHexResult');
            const additionError = document.getElementById('additionError');
            
            addBtn.addEventListener('click', function() {
                const num1 = firstNumber.value.trim();
                const base1 = parseInt(firstBase.value, 10);
                const num2 = secondNumber.value.trim();
                const base2 = parseInt(secondBase.value, 10);
                
                // Validate inputs
                let valid1 = false, valid2 = false;
                let dec1, dec2;
                
                try {
                    dec1 = parseInt(num1, base1);
                    valid1 = !isNaN(dec1);
                } catch (e) {
                    valid1 = false;
                }
                
                try {
                    dec2 = parseInt(num2, base2);
                    valid2 = !isNaN(dec2);
                } catch (e) {
                    valid2 = false;
                }
                
                if (!valid1 || !valid2) {
                    additionError.style.display = 'block';
                    return;
                }
                
                additionError.style.display = 'none';
                const sum = dec1 + dec2;
                
                addDecimalResult.textContent = sum;
                addBinaryResult.textContent = sum.toString(2);
                addOctalResult.textContent = sum.toString(8);
                addHexResult.textContent = sum.toString(16).toUpperCase();
            });
            
            // Secret Code Encode
            const messageInput = document.getElementById('messageInput');
            const encodeKey = document.getElementById('encodeKey');
            const encodeBtn = document.getElementById('encodeBtn');
            const decimalEncodeResult = document.getElementById('decimalEncodeResult');
            const hexEncodeResult = document.getElementById('hexEncodeResult');
            const encodeError = document.getElementById('encodeError');
            let lastEncodedDecimalValues = null;
            
            encodeBtn.addEventListener('click', function() {
                const message = messageInput.value.trim();
                const key = encodeKey.value.trim();
                
                if (message === '' || key === '' || isNaN(key)) {
                    encodeError.style.display = 'block';
                    return;
                }
                
                encodeError.style.display = 'none';
                const keyNum = parseInt(key, 10);
                
                const decimalValues = [];
                const hexValues = [];
                
                for (let i = 0; i < message.length; i++) {
                    const charCode = message.charCodeAt(i) + keyNum;
                    decimalValues.push(charCode);
                    hexValues.push(charCode.toString(16).toUpperCase());
                }
                
                decimalEncodeResult.textContent = '[' + decimalValues.join(', ') + ']';
                hexEncodeResult.textContent = '[\'' + hexValues.join('\', \'') + '\']';
                lastEncodedDecimalValues = decimalValues;
            });
            
            // Secret Code Decode
            const decodeKey = document.getElementById('decodeKey');
            const decodeBtn = document.getElementById('decodeBtn');
            const decodeResult = document.getElementById('decodeResult');
            const decodeError = document.getElementById('decodeError');
            
            decodeBtn.addEventListener('click', function() {
                const key = decodeKey.value.trim();
                
                if (!Array.isArray(lastEncodedDecimalValues) || lastEncodedDecimalValues.length === 0 || key === '' || isNaN(key)) {
                    decodeError.style.display = 'block';
                    return;
                }
                
                decodeError.style.display = 'none';
                const keyNum = parseInt(key, 10);
                
                let decodedMessage = '';
                
                for (let i = 0; i < lastEncodedDecimalValues.length; i++) {
                    if (!isNaN(lastEncodedDecimalValues[i])) {
                        decodedMessage += String.fromCharCode(lastEncodedDecimalValues[i] - keyNum);
                    }
                }
                
                decodeResult.textContent = decodedMessage;
            });
        });