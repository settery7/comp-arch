document.addEventListener('DOMContentLoaded', function() {
    const decimalInput = document.getElementById('decimalInput');
    const convertBtn = document.getElementById('convertBtn');
    const binaryResult = document.getElementById('binaryResult');
    const octalResult = document.getElementById('octalResult');
    const hexResult = document.getElementById('hexResult');
    const errorMsg = document.getElementById('errorMsg');
    
    // Function to convert decimal to other number systems
    function convertNumber() {
        // Get the input value and trim whitespace
        const inputValue = decimalInput.value.trim();
        
        // Check if the input is a valid number
        if (inputValue === '' || isNaN(inputValue)) {
            errorMsg.style.display = 'block';
            return;
        }
        
        // Convert to number
        const decimalNum = Number(inputValue);
        
        // Check if it's an integer
        if (!Number.isInteger(decimalNum)) {
            errorMsg.style.display = 'block';
            return;
        }
        
        // Hide error message if previously shown
        errorMsg.style.display = 'none';
        
        // Convert to different number systems
        const binary = decimalNum.toString(2);
        const octal = decimalNum.toString(8);
        const hexadecimal = decimalNum.toString(16).toUpperCase();
        
        // Update the UI with results
        binaryResult.textContent = binary;
        octalResult.textContent = octal;
        hexResult.textContent = hexadecimal;
    }
    
    // Event listener for the convert button
    convertBtn.addEventListener('click', convertNumber);
    
    // Event listener for Enter key in the input field
    decimalInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            convertNumber();
        }
    });
    
    // Clear error when user starts typing
    decimalInput.addEventListener('input', function() {
        errorMsg.style.display = 'none';
    });
});