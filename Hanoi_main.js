function SetInitial() {
    input=document.getElementById("input-1").value;
    if (input==""){
        input=3;
        document.getElementById("input-1").value = input;
        // Reset();
    }
    currgame = new Game("Current", input);
    displayPegs(currgame);
}

function Reset()
{
    SetInitial();
    displayPegs(currgame);
}

function displayPegs(Game){
    game_element = document.getElementById("game-current");
    game_element.innerHTML="";
    pegs_element = Game.create_element();
    game_element.appendChild(pegs_element);
}

function move(block, source, target){
    currgame.move_block(block, source, target);
}


let showsolution = iter => { 
    var block = document.getElementById('input-1').value;
    var solution = [];
    solution = currgame.recursivesolutionmoves(block,1,3,2, solution);
    
    if (iter==null){
        iter = 0;
        console.log(iter);
        move(solution[iter].block_id-1,solution[iter].source-1,solution[iter].target-1);
    }
    else if (iter<solution.length) {
        iter += 1;
        move(solution[iter].block_id-1,solution[iter].source-1,solution[iter].target-1);
        console.log(iter);
    }

    /*this line uses the arrow function where iter doesnt have to be 
        passed as a parameter because of scope 

        //let t = setTimeout(() => {showsolution}, 250, iter);
        //let t = setTimeout(() => { showsolution(iter) }, 250);
        //let t = setTimeout(showsolution, 250, iter);
    */
    let t = setTimeout(() => { showsolution(iter) }, 300);
    
    return solution;
}



