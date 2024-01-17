const Title = document.querySelector('#title');
const menuItems = document.querySelectorAll('#menu ul li');
const credits = document.getElementById('credits');

let selectedItemIndex = 0;
let canvas = document.getElementById('canvas'); // Asegúrate de tener un elemento con el ID 'canvas'

let ballSpeed = 2; // Velocidad inicial de la bola

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowDown') {
        selectedItemIndex = (selectedItemIndex + 1) % menuItems.length;
    } else if (event.key === 'ArrowUp') {
        selectedItemIndex = (selectedItemIndex - 1 + menuItems.length) % menuItems.length;
    } else if (event.key === 'Enter') {
        handleMenuSelection();
    }

    // Control de dirección de la bola
    if (event.key === 'ArrowDown') {
        ball.dy = ballSpeed;
    } else if (event.key === 'ArrowUp') {
        ball.dy = -ballSpeed;
    } else if (event.key === 'ArrowRight') {
        ball.dx = ballSpeed;
    } else if (event.key === 'ArrowLeft') {
        ball.dx = -ballSpeed;
    }

    updateMenuSelection();
});

function updateMenuSelection() {
    menuItems.forEach((item, index) => {
        if (index === selectedItemIndex) {
            item.style.color = 'yellow';
        } else {
            item.style.color = 'white';
        }
    });
}

function handleMenuSelection() {
    const selectedItem = menuItems[selectedItemIndex];
    const itemName = selectedItem.id;

    if (itemName === 'play') {
        startGame();
    } else if (itemName === 'scores') {
        showScores();
    } else if (itemName === 'contacts') {
        showContacts();
    }
}

function hideTitle() {
    document.getElementById('title').style.display = 'none';
}

function hideMenu() {
    document.getElementById('menu').style.display = 'none';
}

function startGame() {
    hideTitle();
    hideMenu();

    let countdown = 3;

    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    countdownElement.style.color = 'white';
    document.body.appendChild(countdownElement);

    const countdownInterval = setInterval(() => {
        if (countdown > 0) {
            countdownElement.innerText = countdown;
        } else if (countdown === 0) {
            countdownElement.innerText = 'GO!';
        } else {
            clearInterval(countdownInterval);
            document.body.removeChild(countdownElement);
            showCanvas();
            requestAnimationFrame(gameLoop);
        }

        countdown--;
    }, 1000);
}

function showCanvas() {
    canvas.style.display = 'block';
}

function gameLoop() {
    const ctx = canvas.getContext('2d');

    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 15,
        dx: 2,
        dy: 2,
    };

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    function updateBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Bordes del canvas
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            ball.dx = -ball.dx;
        }

        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.dy = -ball.dy;
        }
    }

    function loop() {
        updateBall();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        requestAnimationFrame(loop);
    }

    loop();
}

function showScores() {
    // Implementar lógica para mostrar puntajes
    console.log('Mostrando puntajes...');
}

function showContacts() {
    // Implementar lógica para mostrar contactos
    window.location.href = 'https://unknownuser401.github.io/';
}
