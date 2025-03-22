<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Монетный сборщик</title>
    <style>
        canvas {
            background: #87CEEB;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="400"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        let player = {
            x: 50,
            y: 300,
            width: 50,
            height: 50,
            color: 'blue',
            gravity: 0.5,
            jumpPower: -10,
            velocityY: 0,
            isJumping: false
        };

        let coins = [];
        let score = 0;

        function createCoin() {
            const coin = {
                x: Math.random() * canvas.width,
                y: Math.random() * (canvas.height - 50),
                width: 30,
                height: 30,
                collected: false
            };
            coins.push(coin);
        }

        function drawPlayer() {
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }

        function drawCoins() {
            coins.forEach(coin => {
                if (!coin.collected) {
                    ctx.fillStyle = 'gold';
                    ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
                }
            });
        }

        function update() {
            player.velocityY += player.gravity;
            player.y += player.velocityY;

            if (player.y + player.height >= canvas.height) {
                player.y = canvas.height - player.height;
                player.isJumping = false;
            }

            coins.forEach(coin => {
                if (!coin.collected && player.x < coin.x + coin.width && player.x + player.width > coin.x && player.y < coin.y + coin.height && player.y + player.height > coin.y) {
                    coin.collected = true;
                    score++;
                }
            });

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPlayer();
            drawCoins();
            ctx.fillStyle = 'black';
            ctx.fillText('Счет: ' + score, 10, 20);
        }

        function jump() {
            if (!player.isJumping) {
                player.velocityY = player.jumpPower;
                player.isJumping = true;
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                jump();
            }
        });

        setInterval(() => {
            update();
        }, 1000 / 60);

        setInterval(() => {
            createCoin();
        }, 2000);
    </script>
</body>
</html>
