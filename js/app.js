import {game} from './game.js';
import {player} from './player.js';

//
const play = new player();

//ASYNC FUNCTION TO LOAD SELECTED PLAYERS FROM DATABASE ( DATABASE WILL BE IMPLEMENTED  IN A NEXT VERSION)
async function  main(){


  const  player1 = await play.loadPlayers();


    return player1;

}

main()
.then(player=>{

    
    

    const match = new game(player[0],player[1]);
    
    match.test2();



});



