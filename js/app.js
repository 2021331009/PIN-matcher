function generatePin() {
  return Math.floor(1000 + Math.random() * 9000);
}

document.getElementById('generate-pin').addEventListener('click', function() {
    const pin = generatePin(); // call the function
    const displayPinField = document.getElementById('display-pin');
    displayPinField.value = pin; // set the input value
});