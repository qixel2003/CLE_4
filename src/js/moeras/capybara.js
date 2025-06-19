import { Actor, Engine, Vector, Keys, CollisionType, SpriteSheet, range, Animation, Axes, Buttons, Shape } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
import { Player } from '../player.js'
import { Net } from '../tropen/net.js'
import { Food } from './food.js'
import { SwampDoor } from './door.js'
import { BlueBush } from './bluebush.js'

export class Capybara extends Actor {

    animalCount

    constructor() {
        super({
            width: Resources.Capybara.width,
            height: Resources.Capybara.height,
            collisionType: CollisionType.Active
        });

        this.scale = new Vector(1.3, 1.3);
        this.pos = new Vector(200, 300);

        this.collider.set(Shape.Box(50, 30, Vector.Zero, new Vector(-20, 10)));


        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Capybara,
            grid: { rows: 1, columns: 12, spriteWidth: 100, spriteHeight: 100 }
        });

        const idle = runSheet.sprites[1];
        const runLeft = Animation.fromSpriteSheet(runSheet, range(0, 2), 120);
        const runRight = Animation.fromSpriteSheet(runSheet, range(0, 2), 120);
        const runUp = Animation.fromSpriteSheet(runSheet, range(0, 2), 120);
        const runDown = Animation.fromSpriteSheet(runSheet, range(0, 2), 120);

        this.graphics.add("idle", idle);
        this.graphics.add("runleft", runLeft);
        this.graphics.add("runright", runRight);
        this.graphics.add("runup", runUp);
        this.graphics.add("rundown", runDown);
        this.graphics.use(idle); // <-- Now it's defined

        this.setRandomVelocity();

        this.animalCount = 0
    }

    setRandomVelocity() {
        // Pick a random direction and speed
        const angle = Math.random() * Math.PI * 2;
        const speed = 100 + Math.random() * 100;
        this.vel = Vector.fromAngle(angle).scale(speed);

        // Set animation based on direction
        if (this.vel.x < 0) {
            this.graphics.use('runleft');
            this.graphics.flipHorizontal = false;
        } else {
            this.graphics.use('runright');
            this.graphics.flipHorizontal = true;
        }
    }

    onPreUpdate(engine) {



        // Bounce off screen edges
        if (this.pos.x < 40 && this.vel.x < 0) {
            this.pos.x = 40;
            this.vel.x = Math.abs(this.vel.x);
            this.graphics.use('runright');
            this.graphics.flipHorizontal = true;
        }
        if (this.pos.x > 1200 && this.vel.x > 0) {
            this.pos.x = 1200;
            this.vel.x = -Math.abs(this.vel.x);
            this.graphics.use('runleft');
            this.graphics.flipHorizontal = false;
        }
        if (this.pos.y < 100 && this.vel.y < 0) {
            this.pos.y = 100;
            this.vel.y = Math.abs(this.vel.y);
        }
        if (this.pos.y > 800 && this.vel.y > 0) {
            this.pos.y = 800;
            this.vel.y = -Math.abs(this.vel.y);
        }

        if (this.pos.x <= 40 && this.vel.x === 0) {
            this.vel.x = 100;
            this.graphics.use('runright');
            this.graphics.flipHorizontal = true;
        }



        //go for the food
        const foods = this.scene.actors.filter(actor => actor instanceof Food);
        if (foods.length > 0) {
            // Zoek het dichtstbijzijnde eten
            let closest = foods[0];
            let minDist = this.pos.distance(closest.pos);
            for (let food of foods) {
                let dist = this.pos.distance(food.pos);
                if (dist < minDist) {
                    minDist = dist;
                    closest = food;
                }
            }
            // Zet de velocity richting het eten
            const direction = closest.pos.sub(this.pos).normalize();
            this.vel = direction.scale(100); // Pas snelheid aan indien gewenst
            if (direction.x < 0) {
                this.graphics.flipHorizontal = false; // Facing left
            } else if (direction.x > 0) {
                this.graphics.flipHorizontal = true; // Facing right
            }
        } else {
            if (Math.random() < 0.01) {
                this.setRandomVelocity();
            }
        }




    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitNet(event))
        this.on('collisionstart', (event) => this.hitFood(event))
        this.on('collisionstart', (event) => this.onCollisionStart(event))

    }



    attack() {
        console.log("Attack action triggered");
        // Implement attack logic here (e.g., play animation, detect hit)
    }


    onCollisionStart(event) {
       if (
        event.other instanceof BlueBush ||
        event.other instanceof SwampDoor
    )  {
        // Pick a new random direction, or try to move around
        this.setRandomVelocity();
    }
    }

    onCollisionEnd(event) {

    }

    hitNet(event) {
        if (event.other.owner instanceof Net) {
            const player = this.scene.actors.find(actor => actor instanceof Player)
            if (player) {
                player.takeDamage(1)
                console.log("player lost a life")
            }
            this.pos = new Vector(200, 300);

        }
    }

    hitFood(event) {
        if (event.other.owner instanceof Food) {
            console.log("got capybara")
            event.other.owner.kill()
            this.kill()
            this.AnimalCount += 1

        }
    }


    // gameOver() {
    //     this.pos.x = 400;
    //     this.pos.y = 300;
    //     this.health = this.startHealth;
    // }

}