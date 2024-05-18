document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('diceCanvas');
    const ctx = canvas.getContext('2d');

    function drawDiceFace(number) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '100px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(number, canvas.width / 2, canvas.height / 2);
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function rollDice() {
        const number = getRandomNumber();
        drawDiceFace(number);
    }

   
    drawDiceFace(1);

    
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            rollDice();
        }
    });
});
