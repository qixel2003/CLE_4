import { Actor, Engine, Vector, Keys, CollisionType, SpriteSheet, range, Animation, Axes, Buttons, Shape } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Monkey } from './tropen/monkey.js'
import { Orchid } from './tropen/flower.js'
import { Net } from './tropen/net.js'
import { Food } from './moeras/food.js'
import { SwampRose } from './moeras/swampRose.js'

export class Player extends Actor {

    flowerCount;
    health;


    constructor(health = 3) {
        super({
            width: Resources.Player.width,
            height: Resources.Player.height,
            collisionType: CollisionType.Active
        });

        this.health = health;
        this.startHealth = health;

        this.scale = new Vector(0.4, 0.4);
        this.pos = new Vector(500, 300);

        this.collider.set(Shape.Box(130, 200));
        this.collider.set(
            Shape.Box(100, 150, Vector.Zero, new Vector(-23, -10))
        );

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.Player,
            grid: { rows: 1, columns: 12, spriteWidth: 180, spriteHeight: 250 }
        });

        const idle = runSheet.sprites[1];
        const runLeft = Animation.fromSpriteSheet(runSheet, range(3, 5), 120);
        const runRight = Animation.fromSpriteSheet(runSheet, range(6, 8), 120);
        const runUp = Animation.fromSpriteSheet(runSheet, range(10, 11), 120);
        const runDown = Animation.fromSpriteSheet(runSheet, range(0, 2), 120);

        this.graphics.add("idle", idle);
        this.graphics.add("runleft", runLeft);
        this.graphics.add("runright", runRight);
        this.graphics.add("runup", runUp);
        this.graphics.add("rundown", runDown);
        this.graphics.use(idle); // <-- Now it's defined

        this.nearbyFlower = null;
        this.flowerCount = 0
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed = 0;
        const speed = 300;
        let kb = engine.input.keyboard;

        let animSet = false;

        // --- Keyboard movement ---
        if (kb.isHeld(Keys.W)) {
            yspeed = -300;
            this.graphics.use('runup');
            animSet = true;
        }
        if (kb.isHeld(Keys.S)) {
            yspeed = 300;
            this.graphics.use('rundown');
            animSet = true;
        }
        if (kb.isHeld(Keys.A)) {
            xspeed = -300;
            this.graphics.use('runleft');
            animSet = true;
        }
        if (kb.isHeld(Keys.D)) {
            xspeed = 300;
            this.graphics.use('runright');
            animSet = true;
        }

        if (kb.wasPressed(Keys.Right)) this.catch();
        if (kb.wasPressed(Keys.Q)) this.interact();
        if (kb.wasPressed(Keys.Up)) this.layFood();

        // --- Gamepad support ---
        const gamepad = engine.input.gamepads.at(0);
        if (gamepad) {
            const deadzone = 0.2;
            let moveX = gamepad.getAxes(Axes.LeftStickX);
            let moveY = gamepad.getAxes(Axes.LeftStickY);

            if (Math.abs(moveX) > deadzone) {
                xspeed = moveX * speed;
            }
            if (Math.abs(moveY) > deadzone) {
                yspeed = moveY * speed;
            }

            // D-Pad overrides or adds to movement
            if (gamepad.isButtonPressed(Buttons.DpadLeft)) {
                xspeed = -speed;
                this.graphics.use('runleft');
                animSet = true;
            }
            if (gamepad.isButtonPressed(Buttons.DpadRight)) {
                xspeed = speed;
                this.graphics.use('runright');
                animSet = true;
            }
            if (gamepad.isButtonPressed(Buttons.DpadUp)) {
                yspeed = -speed;
                this.graphics.use('runup');
                animSet = true;
            }
            if (gamepad.isButtonPressed(Buttons.DpadDown)) {
                yspeed = speed;
                this.graphics.use('rundown');
                animSet = true;
            }

            // Left stick animation if not overridden by D-pad
            if (!animSet && (moveX !== 0 || moveY !== 0)) {
                if (Math.abs(moveX) > Math.abs(moveY)) {
                    this.graphics.use(moveX < 0 ? 'runleft' : 'runright');
                } else {
                    this.graphics.use(moveY < 0 ? 'runup' : 'rundown');
                }
                animSet = true;
            }

            if (gamepad.isButtonPressed(Buttons.Face1)) this.jump();
            if (gamepad.isButtonPressed(Buttons.Face2)) this.attack();
            if (gamepad.isButtonPressed(Buttons.Face3)) this.interact();
        }

        // Final velocity clamp
        let vel = new Vector(xspeed, yspeed);
        if (!vel.equals(Vector.Zero)) {
            vel = vel.normalize().scale(speed);
        } else if (!animSet) {
            this.graphics.use('idle');
        }

        this.vel = vel;


        // Damage from enemy collision
        if (this.isCollidingWithEnemy && Date.now() - this.lastHitTime >= 1000) {
            this.health -= this.collidingEnemy.attack;
            this.lastHitTime = Date.now();
            console.log(`Player health: ${this.health}`);
        }

        // Death check
        if (this.health <= 0) {
            this.gameOver();
        }

        if(sessionStorage.key === "flower"){
            console.log("got an orchid")
        }  
    }
    


onInitialize(engine) {
    this.on('collisionstart', (event) => this.hitMonkey(event));

    this.on('collisionstart', (event) => this.hitFlower(event));
    this.on('collisionend', (event) => this.leaveFlower(event));
    }


    hitMonkey(event) {
        if (event.other.owner instanceof Monkey) {
            if (this.flowerCount > 0) {
                this.flowerCount -= 1
                console.log("lost flower")
                sessionStorage.removeItem("flower")
                console.log(sessionStorage.getItem("flower"))

                if (this.scene) {
                    this.scene.positionObstacle(Orchid, 1, this.scene.obstaclePositions);
                }
            }
        }
    }


    hitFlower(event) {
        if (event.other.owner instanceof Orchid) {
            sessionStorage.setItem("flower", "orchid")
            console.log("got Orchid")
            console.log(sessionStorage.getItem("flower"))
            event.other.owner.kill()
            this.flowerCount += 1
            
        }

        if (event.other.owner instanceof SwampRose) {
            console.log("got swampRose")
            event.other.owner.kill()
            this.flowerCount += 1

            
        }

        

    }
        

    
    leaveFlower(event) {
        if (event.other.owner === this.nearbyFlower) {
            this.nearbyFlower = null;
            console.log("Moved away from the flower");
        }
    }
        
                


    jump() {
        console.log("Jump action triggered");
        // Implement jump logic here (e.g., apply upward velocity if grounded)
    }


    attack() {
        console.log("Attack action triggered");
        // Implement attack logic here (e.g., play animation, detect hit)
    }


    catch() {
        // let b = new Net()
        // b.pos = new Vector(this.pos.x, this.pos.y)
        // this.scene.add(b)
        // this.scene.add(new Net(this.pos.x + this.width/2, this.pos.y))
        if (this.scene && ["tropen", "moeras", "pool", "savanne"].includes(this.scene.name)) {
            let direction = new Vector(1, 0);
            let net = new Net(this.pos, direction);
            this.scene.add(net);
        }


    }

    layFood() {
         if (this.scene && ["tropen", "moeras", "pool", "savanne"].includes(this.scene.name)) {
        const food = new Food(this.pos.clone());
        this.scene.add(food);
         }
    }


    interact() {
        console.log("Interact action triggered");
        if (this.nearbyFlower) {
            this.flowerInteract();
        }
    }

    flowerInteract() {
        this.nearbyFlower.kill();
        this.flowerCount += 1;
        console.log("Picked up flower! Total:", this.flowerCount);
        this.nearbyFlower = null;
    }
    

    takeDamage() {
        this.health -= 1;
        console.log("Damage taken");
    }

    onCollisionStart(event) {
        console.log('Geraakt door:', event.other);
    }

    onCollisionEnd(event) {

    }


    gameOver() {
        this.pos.x = 400;
        this.pos.y = 300;
        this.health = this.startHealth;
    }

}
