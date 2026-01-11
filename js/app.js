// ---------- PIN GENERATE ----------
function generatePin() {
    return Math.floor(1000 + Math.random() * 9000);
}

document.getElementById('generate-pin').addEventListener('click', function () {
    document.getElementById('display-pin').value = generatePin();
});

// ---------- CALCULATOR INPUT ----------
document.getElementById('calculator').addEventListener('click', function (e) {
    const key = e.target.innerText;
    const field = document.getElementById('typed-numbers');

    if (key === 'C') {
        field.value = '';
    }
    else if (key === '<') {
        field.value = field.value.slice(0, -1);
    }
    else if (!isNaN(key)) {
        field.value += key;
    }
});

// ---------- TRY & LOCK SYSTEM ----------
let tryLeft = 3;
let isLocked = false;

const submitBtn = document.getElementById('verify-pin');
const tryText = document.querySelector('.action-left');
const success = document.getElementById('pin-success');
const failure = document.getElementById('pin-failure');

submitBtn.addEventListener('click', function () {
    if (isLocked) return;

    const generatedPin = document.getElementById('display-pin').value;
    const typedPin = document.getElementById('typed-numbers').value;

    if (generatedPin === typedPin) {
        success.style.display = 'block';
        failure.style.display = 'none';
    } else {
        tryLeft--;
        failure.style.display = 'block';
        success.style.display = 'none';
        tryText.innerText = `${tryLeft} try left`;

        if (tryLeft === 0) {
            lockSystem();
        }
    }
});

// ---------- LOCK FOR 1 MIN ----------
function lockSystem() {
    let timeLeft = 60;
    isLocked = true;
    submitBtn.disabled = true;
    tryText.innerText = `Try again in ${timeLeft}s`;

    const timer = setInterval(() => {
        timeLeft--;
        tryText.innerText = `Try again in ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            resetSystem();
        }
    }, 1000);
}

// ---------- RESET SYSTEM ----------
function resetSystem() {
    tryLeft = 3;
    isLocked = false;
    submitBtn.disabled = false;
    tryText.innerText = '3 try left';
}
