function loop100(){
    update_score();
    animate_character();
}
function loop500(){
    animate_path();
    move_cactus(); //mb faster? 
}
function init(){
    //globals:
    window.loop100Interval=setInterval(function(){
    loop100();
    },100);
    window.generate_cloudsInterval=setInterval(function(){
    generate_clouds(); 
    },1500); 
    window.loop500Interval=setInterval(function(){
    loop500();
    },500); 
    console.log('[INFO]inited');
}
function stopGame(){
    clearInterval(window.loop100Interval);
    clearInterval(window.generate_cloudsInterval);
    clearInterval(window.loop500Interval);
    //document.removeEventListener('click');
}