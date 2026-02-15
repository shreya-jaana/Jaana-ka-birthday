function goToScene(num) {
    document.querySelectorAll(".scene").forEach(scene => scene.classList.remove("active"));
    document.getElementById("scene" + num).classList.add("active");
}

function checkPassword() {
    const input = document.getElementById("password").value;
    if (input === "9/3/2009") {
        goToScene(2);
        startGame();
    } else {
        document.getElementById("error").innerText = "Wrong key to my heart...";
    }
}

/* Rain Animation */
const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rainDrops = [];
for(let i=0;i<100;i++){
    rainDrops.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        l: Math.random()*1,
        xs: -4+Math.random()*4+2,
        ys: Math.random()*10+10
    });
}

function drawRain(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="rgba(174,194,224,0.5)";
    ctx.lineWidth=1;
    ctx.lineCap="round";
    rainDrops.forEach(r=>{
        ctx.beginPath();
        ctx.moveTo(r.x,r.y);
        ctx.lineTo(r.x+r.l*r.xs,r.y+r.l*r.ys);
        ctx.stroke();
    });
    moveRain();
}

function moveRain(){
    rainDrops.forEach(r=>{
        r.x+=r.xs;
        r.y+=r.ys;
        if(r.x>canvas.width||r.y>canvas.height){
            r.x=Math.random()*canvas.width;
            r.y=-20;
        }
    });
}

setInterval(drawRain,30);

/* GAME */
let score=0;
let missed=false;

function startGame(){
    score=0;
    missed=false;
    document.getElementById("score").innerText="Score: 0";
    dropHeart();
}

function dropHeart(){
    if(missed) return;

    const heart=document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML="❤️";
    heart.style.left=Math.random()*90+"%";
    heart.style.top="0px";
    document.getElementById("gameArea").appendChild(heart);

    let fall=setInterval(()=>{
        let top=parseInt(heart.style.top);
        heart.style.top=top+5+"px";

        if(top>window.innerHeight*0.6){
            missed=true;
            clearInterval(fall);
            heart.remove();
            alert("Oh no Jana… you missed my heart.");
            startGame();
        }
    },50);

    heart.onclick=function(){
        score++;
        document.getElementById("score").innerText="Score: "+score;
        heart.remove();
        clearInterval(fall);
        if(score>=10){
            missed=true;
            alert("Oh my God Jana… you caught my heart ❤️");
            document.getElementById("nextBtn").style.display="block";
        } else {
            dropHeart();
        }
    }
}

/* Typing Effect */
const text = `My Jana,

Even though miles stand between us, I feel you closer than anyone else in this world...
You are my peace. You are my comfort. You are my forever.
And no matter how long the wait is… I will always choose you.`;

let i=0;
function typeWriter(){
    if(i<text.length){
        document.getElementById("typedText").innerHTML+=text.charAt(i);
        i++;
        setTimeout(typeWriter,40);
    }
}
typeWriter();

/* Gifts */
let opened=0;
function openGift(el){
    if(!el.classList.contains("open")){
        el.classList.add("open");
        opened++;
        if(opened===4){
            document.getElementById("finalBtn").style.display="block";
        }
    }
}

/* Final */
function showFinal(){
    document.getElementById("finalMessage").innerHTML=
    "<h2>💋 Forever Yours<br>Happy Birthday My Jana ❤️</h2>";
}
