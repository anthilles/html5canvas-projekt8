//Podstawowe ustawienia
const canvas = document.querySelector('#draw'); // wskazanie canvas
const ctx = canvas.getContext('2d'); // zadeklarowanie pracy 2D
canvas.width = window.innerWidth; //szerokość jak okna
canvas.height = window.innerHeight; // wysokość jak okna
ctx.strokeStyle = '#BADA55'; // kolor linii 
ctx.lineJoin = 'round'; // kształt rysowanej linii - okrągły 
ctx.lineCap = 'round'; // kształt rysowanej linii - okrągły
ctx.lineWidth = 50; //grubość

let isDrawing = false; //zmienna potrzebna do procesu rysowania - jak przycis jest wciśnięty to jest true, jak nie - false
let lastX = 0;
let LastY = 0;
let hue= 0;
let direction = true;


function draw(e){
    if(!isDrawing) return; // koniec rysowania kiedy myszka nie jest wciśnięta
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    //jeśli hue osiągnie 360 to liczymy od nowa (0) - kolor
    hue++;
    if(hue >= 360) {
        hue = 0;
    }
    
    //jeśli grubość linii to 100 lub mniej niż 1 to dochodzi do zmiany kierunku liczenia. Jeśli kierunek jest true to dodajemy, jeśli false to odejmujemy.
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
    }
    if(direction){
        ctx.lineWidth++;   
    }else{
        ctx.lineWidth--;
    }
    
    ctx.beginPath();
    //zacznij od
    ctx.moveTo(lastX,LastY);
    //idź do
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    LastY = e.offsetY;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    LastY = e.offsetY;
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);