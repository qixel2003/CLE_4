import { Actor, Engine, Vector, Keys, CollisionType, SpriteSheet, range, Animation, Axes, Buttons, Shape } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'
// import { Net } from './net.js'

export class Penguin extends Actor {

    constructor() {
        super({
            width: Resources.Penguin.width,
            height: Resources.Penguin.height,
            collisionType: CollisionType.Active
        });

        this.scale = new Vector(1.3, 1.3);
        this.pos = new Vector(100, 900);

        this.collider.set(Shape.Box(45, 25, Vector.Zero, new Vector(-30, -125)));


        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Penguin,
            grid: { rows: 1, columns: 12, spriteWidth: 100, spriteHeight: 250 }
        });

        const idle = runSheet.sprites[1];
        const runLeft = Animation.fromSpriteSheet(runSheet, range(0, 7), 120);
        const runRight = Animation.fromSpriteSheet(runSheet, range(0, 7), 120);
        const runUp = Animation.fromSpriteSheet(runSheet, range(0, 7), 120);
        const runDown = Animation.fromSpriteSheet(runSheet, range(0, 7), 120);

        this.graphics.add("idle", idle);
        this.graphics.add("runleft", runLeft);
        this.graphics.add("runright", runRight);
        this.graphics.add("runup", runUp);
        this.graphics.add("rundown", runDown);
        this.graphics.use(idle); // <-- Now it's defined

        this.setRandomVelocity();
        this.nextDirectionChange = 0;
        
    }

    setRandomVelocity() {
        const angle = Math.random() * Math.PI * 2;
        const speed = 200 + Math.random() * 150; 
        this.vel = Vector.fromAngle(angle).scale(speed);

        // Set animation based on direction
        if (this.vel.x < 0) {
            this.graphics.use('runleft');
            this.graphics.flipHorizontal = true;
        } else {
            this.graphics.use('runright');
            this.graphics.flipHorizontal = false;
        }
    }

    onPreUpdate(engine, delta) {

        //  if (Math.random() < 0.01) {
        //     this.setRandomVelocity();
        // }

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

        this.nextDirectionChange -= delta;
        if (this.nextDirectionChange <= 0) {
            this.setRandomVelocity();
            // Set next interval between 0.5 and 2 seconds
            this.nextDirectionChange = 500 + Math.random() * 1500;
        }

    }

    onInitialize(engine) {
        // this.on('collisionstart', (event) => this.hitNet(event))

    }



    attack() {
        console.log("Attack action triggered");
        // Implement attack logic here (e.g., play animation, detect hit)
    }


    onCollisionStart(event) {
        console.log('Geraakt door:', event.other);
    }

    onCollisionEnd(event) {

    }

    hitNet(event) {
        if (event.other.owner instanceof Net) {
            console.log("got ape")
            event.other.owner.kill()
            this.kill()
            console.log(this.scene.engine.playerProgress)
            this.scene.engine.playerProgress[1] = true
            sessionStorage.setItem("tropenanimal", "monkey")
        }
    }


    gameOver() {
        this.pos.x = 400;
        this.pos.y = 300;
        this.health = this.startHealth;
    }

}