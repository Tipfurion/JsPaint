const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const palette=document.getElementById("palette");
const tech=document.getElementById("techLayer");
const techLayer=tech.getContext("2d");
var straightDraw;
var isStraight=true;
var currentPoint={x:0, y:0};
var previousPoint={x:0, y:0};
var mousePressed=false;
var color="#000000";
const cstColor=document.getElementById("customColor");
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
function setColor(obj){
    color=obj.style.backgroundColor;
}

    canvas.onmousemove= function(evt) { 
        Position(evt.offsetX, evt.offsetY);
        
        if(mousePressed){
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
        else{
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
    canvas.onmousedown=function(evt){
        Position(evt.offsetX,evt.offsetY)
        if(isStraight==true){
            straightDraw= setInterval(function(){
                techLayer.clearRect(0,0,canvas.width, canvas.height);
                techLayer.beginPath();
                techLayer.strokeStyle = color;
                techLayer.moveTo(previousPoint.x, previousPoint.y);
                techLayer.lineTo(currentPoint.x, currentPoint.y);
                techLayer.stroke();  },10)
            previousPoint={x:currentPoint.x, y:currentPoint.y};
           
        }
        draw()
        mousePressed = true;
    }
    canvas.onmouseup=function(){
        mousePressed = false;
       if(isStraight==true){
        techLayer.closePath();
        clearInterval(straightDraw);
        context.stroke();
        context.closePath();
        clear(techLayer);
        
       }
     
    }
   canvas.onmouseout=function(){mousePressed=false;}
        
    

    function clear(Layer){
        Layer.clearRect(0,0,canvas.width, canvas.height);
    }