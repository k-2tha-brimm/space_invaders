# Space Invaders
Reboot of the 1978 Arcade classic - take control of a lone ship tasked with fighting off an incoming space invasion. Dodge attacks while at the same time wiping out the enemy fleet.

## Project Timeline

### Day 1
Set up canvas and general page layout. Make sure that all elements are sized and positioned appropriately before populating the board.

### Day 2
Populate the board with ships
Begin building out a class to handle vector movements. There will be four classes responsible for handling the movements of the ships.
1. Vectors/Movement
2. Entities
3. Player Entity
4. Enemy Entities
Because enemy movements will need to be modifiable depending on difficulty, I think that I will need four classes to implement this feature instead of just two (vectors/entities).

### Day 3
Finish polishing and ensuring accurate movement of all entities on the board. My primary concerns are as follows:
1. Enemy ships will need to both change direction and speed up upon collision with one of the left/right boundaries of the board
2. The user ship should not be affected by coming into contact with any of the boundaries of the board
3. When the enemy ships have moved into the player ship's vertical space, the round is lost
4. Begin building out the logic for destruction of ships upon collision with projectiles (another class), and incrementing score accordingly

### Day 4
Finish polishing collision logic between projectiles and entities classes, and implement sounds that indicate that a successful volley has been executed
Build out the leaderboard back end and ensure that it is rendering accurately
Deploy application to Heroku

### Day 5
Final testing of all classes and components
Test that backend database connection is sound
Clean out any remaining bugs and ensure that heroku deployment is running smoothly
Production README

## Technologies and Implementation
The entirety of the project will be done using HTML5 Canvas and Vanilla Javascript, with a small Express backend to support a leaderboard.
<br/><br/>
I will be utilizing an Object Oriented approach to building out this project. One single HTML file will house the canvas element upon which the board and pieces will be drawn, as well as an aside containing instructions and the capability to choose amongst varying difficulty levels.
<br/><br/>
The game itself will be broken up into classes that will be contained within their respective files. Index.js will be the primary entry file, and will contain the event listener responsible for rednering the board upon DOM Content Load, as well as triggering new instances of both Game and Board. Details surrounding the functionality of these two classes and others can be found below.
### Class Overview
```game.js``` - This is where the majority of the game logic will live. The Game class is responsible for populating the board with both enemy ships, as well as the player's ship. One of the trickier aspects of the game was figuring out how to make the enemies move as a group, particularly when encountering one of the boundaries, which triggers a drop in the y position of all ships, reverses direction, and increases velocity.

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
                    }).then(() => n += 5)
                } else {
                    this.enemyShips.map((ship) => {
                        ship.pos[1] += 30;
                        ship.pos[0] -= 10;
                        ship.vel = [-n, 0];
                    }).then(() => n += 5)
                }
            } else {
                ship.move();
            }
        })
    }
```
The moveObjects() function is able to achieve the desired result by checking if any of the ships has come into contact with the boundary. When one has, it then checks to see which boundary was encountered, and maps the new position and velocity for all ships before incrementing the next velocity increase.

### Additional Class Breakdowns Forthcoming =)
