# Space Invaders
Reboot of the 1978 Arcade classic - take control of a lone ship tasked with fighting off an incoming space invasion. Dodge attacks while at the same time wiping out the enemy fleet.

Set up canvas and general page layout. Make sure that all elements are sized and positioned appropriately before populating the board.

The game is setup using an HTML5 Canvas element to populate the board area. Clicking Play Game hides the overlay and paints a new board that is populated to the same specifications as the original game. 55 enemy ships and one player ship then proceed to battle it out for galactic superiority.

Enemy movement and attacks are automated, while the player is able to launch a volley of up to seven attacks at once. After a collision has been detected, or a bullet has exited the playing area, it is removed from the array of live bullets, and the player is able to fire an additional attack. Enemies are able to move until they come into contact with one of the boundaries on either side of the board. At that point, all enemies move down a row and reverse direction.

Player and enemies continue trading barbs until one or the other is depleted. If the player is able to overcome the enemy onslaught, then a new round begins. Can you achieve the high score?

## Technologies and Implementation
The entirety of the project was done using HTML5 Canvas and Vanilla Javascript, with a small Express backend to support a leaderboard.
<br/><br/>
I utilized an Object Oriented approach to building out this project. One single HTML file housed the canvas element upon which the board and pieces are drawn, as well as an aside containing instructions and the capability to choose amongst varying difficulty levels.
<br/><br/>
The game itself is broken up into classes that are contained within their respective files. Index.js is the primary entry file, and contains the event listener responsible for rednering the board upon DOM Content Load, as well as triggering new instances of both Game and Board. Details surrounding the functionality of these two classes and others can be found below.
### Class Overview
```game.js``` - This is where the majority of the game logic lives. game.js is responsible for populating the board with both enemy ships, as well as the player's ship. One of the trickier aspects of the game was figuring out how to make the enemies move as a group, particularly when encountering one of the boundaries, which triggers a drop in the y position of all ships, reverses direction, and increases velocity.

![movement gif](./assets/images/movement.gif)

```
    ./src/game.js
    
    moveObjects() {
        let n = 5;
        this.enemyShips.forEach((ship) => {
            if(this.isOutOfBounds(ship.pos)) {
                if(ship.pos[0] < 0) {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] += 10;
                        ship.vel = [n, 0];
                    })
                } else {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] -= 10;
                        ship.vel = [-n, 0];
                    })
                }
            } else {
                ship.move();
            }
        })
    }
```
The moveObjects() function is able to achieve the desired result by checking if any of the ships has come into contact with the boundary. When one has, it then checks to see which boundary was encountered, and maps the new position and velocity for all ships before incrementing the next velocity increase.

```entities.js``` - Any object that moves in the game inherits from entities.js. This includes players, enemy ships, bombs, and bullets. While each of these classes moves and operates in their own way (handled within the game.js file), their core functionalities are all routed through this base class.

```
    .src/game.js

    if(this.bombs) {
    for(let n = 0; n < this.bombs.length; n++) {
        const bomb = this.bombs[n];
        const player = this.playerShip;
        if(bomb.pos[0] >= (player.pos[0] - player.width) && bomb.pos[0] <= (player.pos[0] + player.width) &&
        bomb.pos[1] >= (player.pos[1] - player.height/2) && bomb.pos[1] <= (player.pos[1] + player.height/2)) {
            this.bombs.splice(this.bombs.indexOf(bomb), 1);
            this.playerLives -= 1;
            this.lifeWasLost = true;
            break;
        }
    };
}
```

Collision detection was crucial to the competitive integrity of the game. The above snippet is to check for enemy bombs coming into contact with the player's ship. Enemy bullets should only be able to strike the player, and the player's bullets should be able to strike and destroy enemy ships. When a collision does occur, the game removes the bullet from the appropriate array, and either removes the ship from the enemy ships array, or reduces the player's lives by 1.

Leaderboard functionality is on the way!

Enjoy, and good luck!