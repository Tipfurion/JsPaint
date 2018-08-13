var canvasHeight=600;
var canvasWidth=800;
const palette = document.getElementById("palette");
const layers = document.getElementById("layers");
init();
const cvsWidth = document.getElementById("canvasWidth")
const cvsHeight = document.getElementById("canvasHeight")
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const tech = document.getElementById("techLayer");
const techLayer = tech.getContext("2d");
const straight = document.getElementById("straight");
const rectangle = document.getElementById("rectangle");



var rectangleDraw;
var straightDraw;
var isRectangle=false;
var isStraight=false;
var currentPoint={x:0, y:0};
var previousPoint={x:0, y:0};
var mousePressed=false;
var color="#000000";
const custom=document.getElementById("customColor");
custom.onchange=function(){color=this.value;cstColor.style.backgroundColor=color;}
var brushSize=2;
const Clear=document.getElementById("clear");
Clear.onclick=function(){clear(context), clear(techLayer)};
const brush=document.getElementById("size");
brush.onchange=function(){
brushSize=this.options[this.selectedIndex].value;
context.lineWidth = brushSize;
context.lineCap="round";
techLayer.lineWidth = brushSize;
techLayer.lineCap="round";
}
cvsWidth.onchange=function(){
    canvasWidth=this.value;
    canvas.width=canvasWidth;
    tech.width=canvasWidth;
}
cvsHeight.onchange=function(){
    canvasHeight=this.value;
    canvas.height=canvasHeight;
    tech.height=canvasHeight
}

straight.onclick=function(){
    if(isStraight==false){
    straight.style.backgroundColor= "#919191";
         isStraight=true;}
    
    else {
        straight.style.backgroundColor="#eee";
        isStraight=false;}
    }
rectangle.onclick=function(){
    if(isRectangle==false){
        rectangle.style.backgroundColor= "#919191";
             isRectangle=true;}
        
        else {
            rectangle.style.backgroundColor="#eee";
            isRectangle=false;}
        }
function init(){  
for(var r=0, max=2; r<=max; r++){
    for(var g=0; g<=max; g++){
        for(var b=0; b<=max; b++){
            palette.innerHTML+="<div class='button' onclick='setColor(this)' style='background:rgb("+
                    Math.round(r*255/max)+", "+
                    Math.round(g*255/max)+", "+
                    Math.round(b*255/max)+")'></div>";
        }
        
    }
}
}
function setColor(obj){
    color=obj.style.backgroundColor;
}

    tech.onmousemove= function(evt) { 
        Position(evt.offsetX, evt.offsetY);
        
        if(mousePressed==true){
            draw()
        }
        
    }

    function draw(){
        if(isStraight==true){
        if(mousePressed){    
            context.beginPath();
            context.strokeStyle = color;
            context.moveTo(previousPoint.x, previousPoint.y);
            context.lineTo(currentPoint.x, currentPoint.y); 
        }
        }
        if (isRectangle==true){
            if(mousePressed==true){
            context.beginPath();
            context.strokeStyle = color;
            context.moveTo(previousPoint.x, previousPoint.y);
            } 
        
        }
        if(isRectangle==false && isStraight==false){
        if(mousePressed==true){
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(previousPoint.x, previousPoint.y);
        context.lineTo(currentPoint.x, currentPoint.y);
        context.stroke();
        context.closePath();
        }
        previousPoint={x:currentPoint.x, y:currentPoint.y};
    }    
    }

    function Position(x,y){
        currentPoint={x:x, y:y};
    }
    tech.onmousedown=function(evt){
        Position(evt.offsetX,evt.offsetY)
        if(isStraight){
            straightDraw= setInterval(function(){
            techLayer.clearRect(0,0,canvas.width, canvas.height);
            techLayer.beginPath();
            techLayer.strokeStyle = color;
            techLayer.moveTo(previousPoint.x, previousPoint.y);
            techLayer.lineTo(currentPoint.x, currentPoint.y);
            techLayer.stroke();
          },10);
            previousPoint={x:currentPoint.x, y:currentPoint.y};
        }
        if(isRectangle){
            previousPoint={x:currentPoint.x, y:currentPoint.y};
            rectangleDraw=setInterval(function(){
            techLayer.clearRect(0,0,canvas.width, canvas.height);
            techLayer.beginPath();
            techLayer.strokeStyle = color;
            techLayer.strokeRect(previousPoint.x, previousPoint.y, currentPoint.x-previousPoint.x,currentPoint.y-previousPoint.y);
            },10)
            
            
        }
        draw()
        mousePressed = true;
    }
    tech.onmouseup=function(){
        mousePressed = false;
       if(isStraight){
        techLayer.closePath();
        clearInterval(straightDraw);
        context.stroke();
        context.closePath();
        clear(techLayer);
       }
       if(isRectangle){
        techLayer.closePath();
        clearInterval(rectangleDraw);
        context.strokeRect(previousPoint.x, previousPoint.y, currentPoint.x-previousPoint.x,currentPoint.y-previousPoint.y);
        context.closePath();
        clear(techLayer);
       }
     
    }
   tech.onmouseout=function(){
    mousePressed=false;
    if(isStraight){
    context.stroke();
    context.closePath();
    clearInterval(straightDraw);
    }
   clearInterval(rectangleDraw);
}
        
    

    function clear(Layer){
        Layer.clearRect(0,0,canvas.width, canvas.height);
    }