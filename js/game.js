

export  class game{


    constructor(player1,player2){


        //MATCH PLAYERS

        this.player=[];
        this.player[0]=player1;
        this.player[1]=player2;

        //MATCH PARAMETERS
        this.board = [
            ['','',''],
            ['','',''],
            ['','','']
        ];

        
        this.turn=0;
        this.gameEnded=false;
        this.startTime=0;
        this.endTime=0;
        this.cronometerStarted=false;

        
        //MATCH EVENT LISTENERS
        this.ga = document.querySelector("#game-board");
        this.ga.addEventListener('click',this.move.bind(this));
        this.resetGame= document.querySelector("#reset-game");
        this.resetGame.addEventListener('click',this.reset.bind(this));
        

        setInterval(this.showClock.bind(this),1000);
         
    }     
    

  //PLAYERS MOVEMENTS
    move(e){     
            
            const cell = e.target;
            //VERIFING CELL HAS BEEN CLICKED
            if(cell.nodeName==='TD'&& !this.gameEnded){
                
                this.startCronometer();
                this.cronometerStarted=true;  
                this.gameMessages('');
                const row = e.target.getAttribute('data-row');
                const column = e.target.getAttribute('data-column');
                //CHECK FOR LEGAL MOVEMENTS
                let illegalMovement = this.illegalMovement(row,column);
                //PLAY ONLY IF IT'S A LEGAL MOVEMENT

                if (illegalMovement){                    
                    this.board[row][column]=this.player[this.turn].icon;   
                    cell.innerText=this.player[this.turn].icon;
                   
                    //VERIFYING IF THERE IS A WINNER
                    this.verifyWinner(row,column);

                    //VERIFYING IF THERE IS A DRAW
                    this.verifyDraw();
     
                                
                    //CHANGING TURNS
                    this.changeTurns();

                    
                   
                
    
                }else{
                    console.log('ILLEGAL MOVEMENT')
                }
    
    
               

                



            }

         

            
        
           

            
           
    

        }

        test2(){

         


        }
        //VERIFY IF THE MOVEMENT WAS LEGAL
        illegalMovement(row, column){

            if (this.board[row][column]===''){
                return true;

            }else{
                return false;
            }  
        }
        //CHANGE PLAYER'S TURN
        changeTurns(){

            if (this.turn===0){
                this.turn=1;
            }
            else{
                this.turn=0;
            }
        }

        

        //VERIFY WINNER
        verifyWinner(row,column){

            let winner = this.verifyCells(row,column);

            if(winner===3){

               
                this.gameEnded=true;
                this.cronometerStarted=false;
                this.savePlayerScore();
                this.gameMessages(`${this.player[this.turn].name} WINS!`);

            }
           
            
            

            
        }
        //VERIFY DRAWS
        verifyDraw(){
            let drawCounter=0;
            for(let i=0;i<=2;i++){

                for (let j=0;j<=2;j++){
                    if(this.board[i][j]!==''){
                        drawCounter++
                       
                    }
                }

            }
            if( drawCounter===9){
                this.gameMessages('DRAW');
                this.gameEnded=true;
                this.cronometerStarted=false;

            }

          


        }

        verifyCells(row,column){
            let counter=0;
            let win=0;

            //HORIZONTAL VERIFICATION

            while(counter!==3 ){

                

                if(this.board[row][counter]===this.player[this.turn].icon){
                    win++
                    
                }
                counter++;
            }
            
         //VERTICAL VERIFICATION   
             if(win!==3){

        
                    let counter=0;
                    win=0;
                    
                    while(counter!==3){
                    
                    if(this.board[counter][column]===this.player[this.turn].icon){
                        win++
                        
                    }
                    counter++;
                }



            }
         
        
        //DIAGONAL VERIFICATION
            

            if(win!==3){
                 counter=0;
                 win=0;
                
                while(counter!==3){

                    if(this.board[counter][counter]===this.player[this.turn].icon){
                        win++
                        
                    }
                    counter++;
                }
    


            }


            if(win!==3){
                 counter=0;
                 win=0;
                
                while(counter!==3){

                    if(this.board[counter][2-counter]===this.player[this.turn].icon){
                        win++
                        
                    }
                    counter++;
                }
    


            }

            
            
            return win;
           
        }

        //CHRONOMETER

        startCronometer(){
            //CHECKING IF CRONOMETER IS ALREADY STARTED
            if(!this.cronometerStarted){
                const startTime= new Date();
                this.startTime=startTime;

            }

      

            
        
            
        
              
            
      
        }

        //SETUP CLOCK ON HTML AND SAVE CURRENT TIME

        showClock(){

           
            const clock = document.querySelector('#clock');

            if(this.cronometerStarted){
                this.endTime=new Date();

                let diff= this.endTime-this.startTime;
                let timediff= diff/1000;
    
                timediff= Math.round(timediff);
    
               
                clock.innerHTML=timediff;    
                

                
    

            }else{
            let  timediff=this.endTime-this.startTime;
            if(timediff===0){
                clock.innerHTML=timediff;
            }else{

                let diff= this.endTime-this.startTime;
                timediff= diff/1000;
    
                timediff= Math.round(timediff);
    
                
                clock.innerHTML=timediff;  
            }
           
                



            }

          
           
            




        }
      

        //RESET GAME

        reset(){

            if(this.gameEnded===true){
                this.board = [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ];
        
                
                
                this.gameEnded=false;
                this.startTime=0;
                this.endTime=0;
                this.cronometerStarted=false;
                this.resetHtml();
                this.gameMessages(`${this.player[this.turn].name}'s turn`);

            }
            


        }

        resetHtml(){

            let board= document.querySelector('#game-board'); 
            let clock= document.querySelector('#clock');
            board.innerHTML=`
            
            <tbody>
                                        <tr>
                                            <td data-row="0" data-column="0"></td>
                                            <td data-row="0" data-column="1" ></td>
                                            <td data-row="0" data-column="2"></td>
                                        </tr>
                                        <tr>
                                            <td data-row="1" data-column="0"></td>
                                            <td data-row="1" data-column="1"></td>
                                            <td data-row="1" data-column="2"></td>
                                        </tr>
                                        <tr>
                                            <td data-row="2" data-column="0"></td>
                                            <td data-row="2" data-column="1"></td>
                                            <td data-row="2" data-column="2"></td>
                                        </tr>
                            </tbody>
            
            
            
            `;
            clock.innerHTML=this.endTime-this.startTime;
            this.resetPlayersHtml();


        }

        resetPlayersHtml(){

            for(let i=0;i<2;i++){

               
                let player= document.querySelector(`#player${i+1}`);
                
                player.children[0].innerHTML=`${this.player[i].name}` ;
                player.children[1].innerHTML=`${this.player[i].wins}` ;
                player.children[2].innerHTML=`${this.player[i].score}` ;


            }
           
    

        }


        //SAVING SCORES OF THE PLAYERS 
        savePlayerScore(){

             this.player[this.turn].wins = this.player[this.turn].wins +1;
             this.player[this.turn].score =  this.player[this.turn].score +10;

        }

        gameMessages(message){
            const gameMessage=   document.querySelector('#game-message');

            gameMessage.innerHTML=message;


        }
        




    
        
    }




