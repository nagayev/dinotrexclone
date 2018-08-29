console.log('[INFO]index.js loaded');
var running = true;
var character_state = 2;
var path_state = 1;
var marginLeft = 90; //margin for cactus
//Score and high_score is objects 
//So you can use score.toString method
var score = {
    score:0,
    toString:function(){
        return this.score.toString()
    }
};
var high_score = {
    high_score:0,
    toString:function(){
        return this.high_score.toString()
    }
};
document.addEventListener('click',function(e){
    control_character(e);
});
function randint(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}

function generate_clouds(cloud_num){
    /*
    Генерируем облака
    Есть 2 уровня: 0,1
    div в котором находится уровни - clouds(id)
    он постоянной высоты и ширины
    Облака движутся слева направо с разной скоростью
    */
    var clouds = document.getElementById('clouds');
    var cloud = document.getElementsByClassName('cloud');
    var cloud_num = randint(0,2);
    //console.log(cloud_num);
    if(cloud_num==0){
        //clear space
        for(i=0;i<cloud.length;i++){
            cloud[i].src="";
        }
        return;
    }
    // 1 или 2 облака
    for(i=0;i<cloud_num;i++){
        var lvl = randint(0,1); //0 или 1
        cloud[lvl].src="img/cloud.png";
        //cloud[+!lvl].src="";
    }
}
function control_character(e){
    //console.log(e.keyCode);
    console.log('Clicked.Jump!');
    //Если была вызвана stopGame,то прыгать не будет
    if(running){
        var dino = document.getElementById('dino');
        dino.style.marginBottom="5%";
        setTimeout(function(){
            dino.style.marginBottom="0%"; //после прыжка возвращаемся на землю через 500мс
        },500);
    }
}
function animate_character(){
    if(character_state>4) character_state=1;
    var image = document.getElementById('dino');
    var src = 'img/dino' + character_state + '.png'
    image.src=src;
    character_state++;
}
function move_cactus(){
    //TODO:пофиксить баг и улучшить работу
    var cactus = document.getElementById('cactus');
    var dino = document.getElementById('dino');
    if(dino.style.marginBottom==="") dino.style.marginBottom="0%";
    if(marginLeft===0 && parseInt(dino.style.marginBottom)===0){ //если позиция кактуса,такая же как у дино и дино на земле
        console.log('Game over');
        stopGame(); //закончить игру
        dino.style.marginBottom="0%"; //приземляем дино
        cactus.style.marginLeft="0%"; //придвинуть кактус к дино
        dino.src="img/dinofail.png"; //сделать дино грустным
        alert('Game finished!'); 
        return;
    }
    else if(marginLeft===0){
        //если кактус ушел,а дино перепрыгнул,то создать new cactus
        console.log('[INFO]spawning new cactus...');
        //alert(dino.style.marginBottom===""); //FIXME:true!!!!!
        //var cactusType=randint(1,3);
        //console.log("img/cactus"+cactusType+".png");
        //cactus.src="img/cactus"+cactusType+".png";
        cactus.style.marginLeft="90%";
        marginLeft=90;
        return;
    }
    cactus.style.marginLeft=marginLeft + "%"; // from 10 (number) to "10%" 
    marginLeft-=5;
}
function animate_path(){
    if(path_state>10) path_state=1;
    var html = document.getElementById('path');
    var src = 'url(img/path' + path_state + '.png)';
    /*
    var generated_html = "<img src=' " + src + " '> ".repeat(2);
    html.innerHTML=generated_html;
    */
    //console.log(src);
    html.style.backgroundImage=src;
    path_state++;
}
function update_score(){
    if(score.score>high_score.high_score) high_score = score;
    score.score++;
    var score_dom = document.getElementById('score');
    var high_score_dom = document.getElementById('high_score');
    var score_text = "Score: " + score.toString();
    var high_score_text = "High score: " + high_score.toString();
    score_dom.innerHTML=score_text;
    high_score_dom.innerHTML=high_score_text;
}
/*
function load_music(music_path){
     var audioElement =
document.getElementById('bgsound');
audioElement.pause();
audioElement.currentTime=0;
audioElement.src=music_path;
audioElement.play();
}
*/