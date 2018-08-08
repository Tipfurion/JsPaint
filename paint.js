const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const palette=document.getElementById("palette");

var currentPoint={x:0, y:0};
var previousPoint={x:0, y:0};
var mousePressed=false;
var color="#000000";
context.lineCap="round";
const cstColor=document.getElementById("customColor");
const custom=document.getElementById("customColor");
custom.onchange=function(){color=this.value;cstColor.style.backgroundColor=color;}
var brushSize=2;
const Clear=document.getElementById("clear");
Clear.onclick=function(){clear()};
const brush=document.getElementById("size");
brush.onchange=function(){
brushSize=this.options[this.selectedIndex].value;
context.lineWidth = brushSize;

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
        if(mousePressed==true){
        context.beginPath();
        context.strokeStyle = color;
        context.moveTo(previousPoint.x, previousPoint.y);
        context.lineTo(currentPoint.x, currentPoint.y);
        context.stroke();
        context.closePath();
        }
        previousPoint={x:currentPoint.x, y:currentPoint.y}
        
    }

    function Position(x,y){
        currentPoint={x:x, y:y};
    }
    canvas.onmousedown=function(evt){
        Position(evt.offsetX,evt.offsetY)
        
        draw()
        mousePressed = true;
    }
    canvas.onmouseup=function(){
        mousePressed = false    ;
    }
   canvas.onmouseout=function(){mousePressed=false;}
        
    

    function clear(){
        context.clearRect(0,0,canvas.width, canvas.height);
    }