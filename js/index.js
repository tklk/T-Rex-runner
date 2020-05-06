var index_Word = document.getElementById("Name");
var index_Trex = document.getElementById("Demo");
var BG_Land1 = document.getElementById("Land1");
var BG_Land2 = document.getElementById("Land2");
var Shake = 3; // name animation
var fire_i = 0;
var trex_Img = ["img/trex0.png", "img/trex1.png"] // get img

var index_shake_Timer = setInterval(index_shake,200);
function index_shake() { // Home page animation
    Shake *= -1;
    index_Word.style.top = index_Word.offsetTop + Shake + "px";
    index_Trex.src = trex_Img[fire_i++];
    if (fire_i == 2) { fire_i = 0; }
}

var Landrun = setInterval(Land_animate, 30);
function Land_animate() {
    if (BG_Land1.offsetLeft <= -686) { // delete land 1 
        BG_Land1.style.left = "686px";
    }
    if (BG_Land2.offsetLeft <= -686) { // delete land 2 
        BG_Land2.style.left = "686px";
    } // move land
    BG_Land1.style.left = BG_Land1.offsetLeft - 3 + "px";
    BG_Land2.style.left = BG_Land2.offsetLeft - 3 + "px";
}