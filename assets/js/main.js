$(document).ready(function(){
  
    $('.modal').modal();
    $('#modal1').modal('open');
    
});

let playerSprite;

let femaleSprite = document.getElementById("female");
femaleSprite.addEventListener("click", () => {
    playerSprite = 'assets/tileset/frames/playerSprite/wiz-f-spritesheet.png';
    localStorage.setItem("playerSprite", playerSprite);
    window.location.href = '/level-1.html';
});

let maleSprite = document.getElementById("male");
maleSprite.addEventListener("click", () => {
    playerSprite = 'assets/tileset/frames/playerSprite/wiz-m-spritesheet.png';
    localStorage.setItem("playerSprite", playerSprite);
    window.location.href = '/level-1.html';
});
