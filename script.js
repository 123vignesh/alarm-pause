
let timerobj= {
    minutes:0,
    seconds:0,
    timerId:0

}
function soundAlarm() {
    let a=3;
    let b=new Audio("Timer_Sound_Effect.mp3");
    

    function playsound(){
        b.pause();
        b.currentTime=0;
        b.play();
    }

    for(let i=0 ; i<a ; i++){
        setTimeout (playsound, 1200*i);
    }

}
function updatevalue(key,value){
    if(value<0){
        value=0;
        console.log("Pasitive numbers only");

    }
    if(key == "seconds"){
        if(value<10){
            value= "0"+value;

        }
        if(value>59){
            value=59;
        }
    }
    $("#"+key).html(value || 0 );
    timerobj[key]=value;
}

(function detectChanges(key){
    let input="#"+key+"-input";
    $(input).change(function(){
        updatevalue(key,$(input).val());

    });
    $(input).keyup(function(){
        updatevalue(key,$(input).val());

    });

    return arguments.callee;
})("minutes")("seconds");

function startTimer(){
buttonManager(["start",false], ["stop",true], ["pause",true]);
freezInputs();
 timerobj.timerId= setInterval(function(){
     timerobj.seconds--;
     if(timerobj.seconds<0){
         if(timerobj.minutes==0){
             soundAlarm();
             return stopTimer();
             
         }
         timerobj.minutes--;
         timerobj.seconds=59;
     }
     updatevalue("minutes",timerobj.minutes);
     
updatevalue("seconds",timerobj.seconds);

     
 },1000);
}

function stopTimer(){
    clearInterval(timerobj.timerId);
    buttonManager(["start",true], ["stop",false], ["pause",false]);
unfreezeInputs();
updatevalue("minutes",$("#minutes-input").val());
let seconds = $("#seconds-input").val();
if(seconds < 10) { seconds = "0" + seconds; }
updateValue("seconds", seconds);



}

function pauseTimer(){

    buttonManager(["start",true], ["stop",false], ["pause",false]);
    clearInterval(timerobj.timerId);

}
function buttonManager(...buttonArray){
    for(let i=0;i<buttonArray.length;i++){
    let button="#"+buttonArray[i][0]+"-button";
    if(buttonArray[i][1]){
        $(button).removeAttr("disabled");


    }else{
        $(button).attr("disabled" ,"disabled");
    }
  }
}
function freezInputs(){
    $("#minutes-input").attr("disabled","disabled");
    $( "#seconds-input").attr("disabled","disabled");
}
function unfreezeInputs(){
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");
}

