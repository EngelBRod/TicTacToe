export class player{

    constructor(){

        this.players=[

            {

                name:'Stephie',
                wins:0,
                score:0,
                icon:'X'
            
            },

            {

                name:'Engel',
                wins:0,
                score:0,
                icon:'O'
            
            }

        ]
        
        this.started=false;

        this.tag=document.querySelector('#reset-game');




    }
    //loadPlayers

    
    loadPlayers (){

        console.log(this.started);
  

            return new Promise(resolve=>{
                
                this.tag.addEventListener('click', ()=>{
                  if(!this.started){
                    this.loadPlayersHtml();
    
                    resolve(this.players);
                    this.started=true;

                  }
                    
                    
    
                });
                
            })
            
      

       

        
        



    }

    //Load info in html
    loadPlayersHtml(){

        let player1= document.querySelector(`#player1`);
        player1.children[0].append(this.players[0].name);
        player1.children[1].append(this.players[0].wins);
        player1.children[2].append(this.players[0].score);

        let player2= document.querySelector(`#player2`);
        player2.children[0].append(this.players[1].name);
        player2.children[1].append(this.players[1].wins);
        player2.children[2].append(this.players[1].score);
        


        console.log('PRUEBA');
        






    }






}