function SetInitial() {
    input=document.getElementById("input-1").value;
    if (input==""){
        input=3;
        document.getElementById("input-1").value = input;
        // Reset();
    }
    currgame = new Game("Current", input);
}

function Reset()
{
    SetInitial();
    displayPegs(currgame);
}

function displayPegs(Game){
    game_element = document.getElementById("game-current");
    pegs_element = Game.getPegsInnerHTML();
    game_element.appendChild(pegs_element);

}

function displayBlocks(){
    
}
//     //collect all blocks in the DOM
//     pegblocks = document.getElementsByClassName("blocks");

//     //Loop through each elements with the class blocks and clear their contents
//     for (var i=0; i < pegblocks.length; i++){
//         pegblocks[i].innerHTML="";
//     }

//     firstpeg = document.getElementsByClassName("pegs")[0];
//     firstpegblocks = firstpeg.getElementsByClassName("blocks")[0];

//     blocks=3;
    
//     input=document.getElementById("input-1").value;

//     if (input!=""){
//         blocks = document.getElementById("input-1").value
//     }

//     widthintreval=100/blocks;
//     width = widthintreval;

//     for (var i=0; i < blocks; i++){
//         var id = "block-" + (i+1);
//         widthstyle = width + "%";

//         block = document.createElement("Div");
//         block.className = "block";
//         block.id = id; 
//         block.style.width = widthstyle;
//         block.style.backgroundColor = "orange";
//         block.innerHTML=i+1;
        
//         firstpegblocks.appendChild(block);
        
//         width += widthintreval;
//     }
// }
