function randomColor(){
    var colors = ['#ff0000', '#00ff00', '#0000ff','#e35daf','#f7f52f','#64a055','#825487','#046d1c','#c591c6','#d09f14','#439c99','#80143a','#75dd98','#917ea7','#297aa5','#5158fc','#d3f5fa','#b1e69b'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    return random_color;
}

class Block{
    constructor(id){
         this.id=id;
         this.name=id+1;
         this.element_id = "block-" + this.id;
         this.element = "";
     }

    create_element(width){
        var widthstyle = width + "%";

        this.element = document.createElement("Div");
        this.element.className = "block";
        this.element.id = this.element_id;
        this.element.style.background = "#ffffff";
        // this.element.style.backgroundColor = randomColor();
        this.element.style.width = widthstyle;
        this.element.innerHTML = this.name;

        return this.element;
    } 

    get_element(){
        return document.getElementById(this.element_id);
    }

    isequal(id){
        return id = this.id;
    }

}

class Peg {
    constructor(id, blocks_num){
        this.id = id;
        this.name = id+1;
        this.blocks = [];
        this.element_id = "peg-" + this.id;
        this.element = "";
        this.addblocks(blocks_num);
       
    }

    addblocks(blocks_num){
        if(this.id==0){
            for(var i=0; i<blocks_num;i++){
                var block = new Block(i);
                this.blocks.push(block);
            }
        }

    }

    getBlocksInnerHTML(widthintreval, width){
        var blocks_element = document.createElement("Div");
        blocks_element.className = "blocks";
        // pegs_element.id = "game-current" + this.id;
        
        for(var i=0; i<this.blocks.length;i++) {
            if(this.blocks[i].element=="") {
                var block = this.blocks[i].create_element(width);
                this.blocks[i].create_element(width);
            }
            else {
                var block = this.blocks[i].element;
            }
            blocks_element.appendChild(block);

            width += widthintreval;
        }
        return blocks_element;
    }

    create_element(widthintreval,width){
        this.element = document.createElement("Div");
        this.element.className = "peg";
        this.element.id = this.element_id;    
        
        var peg_name = document.createElement("Div");
        peg_name.className = "peg-name";
        peg_name.innerHTML = this.name;
        var blocks_element = this.getBlocksInnerHTML(widthintreval, width);

        this.element.appendChild(blocks_element); 
        this.element.appendChild(peg_name);

        return this.element;
    }

    get_element(){
        return this.element;
    }

    get_block(block_id){
        return this.blocks[block_id].get_element();
    }

    refresh_element(){
        this.element.innerHTML = "";
        //set blocks 
        var blocks_element = document.createElement("Div");
        blocks_element.className = "blocks";
        // pegs_element.id = "game-current" + this.id;
        
        for(var i=0; i<this.blocks.length;i++) {
            var block = this.blocks[i].element;
            blocks_element.appendChild(block);
        }
        
        this.element.appendChild(blocks_element);
        
        //set peg name
        var peg_name = document.createElement("Div");
        peg_name.className = "peg-name";
        peg_name.innerHTML = this.name;
        
        this.element.appendChild(peg_name);

        return this.element;
    }

    find_block_index(block_id){
        for(var i=0; i<this.blocks.length;i++){
            if(this.blocks[i].id == block_id){
                return i;
            }
            

        }
    }

}

class Step{
    constructor(block_id, source, target){
        this.block_id=block_id;
        this.source = source; 
        this.target = target; 
    }

    get_step(){
        var step = [this.block_id, this.source, this.target];
        return step;
    }

}

class Game{
    constructor(id, blocks_num)
    {
        this.id = id;
        this.num_pegs = 3; 
        this.num_blocks = blocks_num;
        this.pegs = [];
        this.addpegs(blocks_num);
        this.solution = [];

       
    }

    addpegs(blocks_num){
        for(var i=0; i<this.num_pegs;i++){
            var peg = new Peg(i, blocks_num);
            this.pegs.push(peg);

        }
    }

    create_element(){
        var pegs_element = document.createElement("Div");
        pegs_element.className = "pegs";
        // pegs_element.id = "game-current" + this.id;
    
        var widthintreval = 100/this.num_blocks;
        var width = widthintreval;

        for(var i=0; i<this.pegs.length;i++){
            if (this.pegs[i].element=="") {
                var peg = this.pegs[i].create_element(widthintreval,width);
            }
            else {
                var peg = this.pegs[i].get_element();
            }

            pegs_element.appendChild(peg);
            
        }
        return pegs_element;
    }

    //remake into recursive function in the future
    find_block_index(block_id, source) {
        
        return this.pegs[source].find_block_index(block_id);
    }

    move_block(block_id, source, target){
        //(1)***remove from source 
        var block_source_index = this.find_block_index(block_id, source);


        var block_element = this.pegs[source].blocks[block_source_index];
        
        //bug with colors noted here
        // var block_new = new Block(block_id);
        // block_new.element = block_element.get_element();

        this.pegs[target].blocks.unshift(block_element);

        this.pegs[source].blocks.splice(block_source_index, 1);
        
        //(2)***append to target 
        //(3)***refresh source & target
        this.pegs[source].refresh_element();
        this.pegs[target].refresh_element();
        
    }


    //future development ... displaying a solution to an end user
    recursivesolutionprint(blocks, source, target, intrem) {
        if(blocks==1){
            var output = "Move " + blocks + " From Peg " + source + " To Peg " + target;
            var output_element = document.createElement("Div");
            output_element.innerHTML = output; 
            output_element.style.color = "white";
            document.querySelector("body").appendChild(output_element);
            return;
 
        }
        
        this.recursivesolutionprint(blocks-1, source, intrem, target); 
            var output = "Move " + blocks + " From Peg " + source + " To Peg " + target;
            var output_element = document.createElement("Div");
            output_element.innerHTML = output; 
            output_element.style.color = "white";
            document.querySelector("body").appendChild(output_element);
        
            this.recursivesolutionprint(blocks-1, intrem, target, source); 
    }

    recursivesolutionmoves(blocks, source, target, intrem, steps) {
        
        if (blocks<=0){
            //var step = new Step(blocks, source, target);
            //steps.push(step);
            return steps;
        }
        else {
            //window.setTimeout(function(game, blocks, source, intrem, target, steps){game.recursivesolutionmoves(blocks-1, source, intrem, target, steps);}, 2000, this, blocks, source, intrem, target, steps);
            
            this.recursivesolutionmoves(blocks-1, source, intrem, target, steps);
            //var output = "Move " + blocks + " From Peg " + source + " To Peg " + target;
            var step = new Step(blocks, source, target);
            steps.push(step);
                
            //this.move_block(blocks-1, source-1, target-1);
            //window.setTimeout(function(game, blocks, source, target){game.move_block(blocks-1, source-1, target-1);},2000, this,blocks,source,target);
            //var output_element = document.createElement("Div");
            //output_element.innerHTML = output; 
            //output_element.style.color = "white";
            //document.querySelector("body").appendChild(output_element);
            

            //window.setTimeout(function(game, blocks, source, intrem, target, steps){game.recursivesolutionmoves(blocks-1, intrem, target, source, steps);}, 2000, this, blocks, source, intrem, target, steps);
            this.recursivesolutionmoves(blocks-1, intrem, target, source, steps);
        }
        // var step = new Step(blocks, source, target);
        // steps.push(step);
        return steps;
    
    }
}

