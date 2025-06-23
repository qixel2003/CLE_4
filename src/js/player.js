import { Actor, Engine, Vector, Keys, CollisionType, SpriteSheet, range, Animation, Axes, Buttons, Shape } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Monkey } from './tropen/monkey.js'
import { Orchid } from './tropen/flower.js'
import { Net } from './tropen/net.js'
import { Food } from './moeras/food.js'
import { SwampRose } from './moeras/swampRose.js'
import { SwampBackground } from './moeras/background.js'
import { SwampBackground1 } from "./moeras/swampbg1.js";
import { SwampBackground2 } from "./moeras/swampbg2.js";
import { SwampBackground3 } from "./moeras/swampbg3.js";
import { SwampBackground4 } from "./moeras/swampbg4.js";
import { SwampBackground5 } from "./moeras/swampbg5.js";
import { SwampBackground6 } from "./moeras/swampbg6.js";
import { SwampBackground7 } from "./moeras/swampbg7.js";
import { SwampBackground8 } from "./moeras/swampbg8.js";
import { SwampBackground82 } from "./moeras/swampbg82.js";
import { SwampBackground83 } from "./moeras/swampbg83.js";
import { SwampBackground9 } from "./moeras/swampbg9.js";
import { LabBook } from "./lab/book.js"

export class Player extends Actor {
    isNearDoor = false;
    doorTargetScene = null;
    isNearBook = false;

    flowerCount;
    health;
    canLayFood
    flowercollection


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
        this.z = 1;

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
        this.graphics.use(idle);

        this.nearbyFlower = null;
        this.flowerCount = 0

        this.canlayFood = true;
        this.flowercollection = []
        // this.Position = true
        // console.log(this.Position)
        // this.fastContacts = 0;      // In de constructor
        // this.fastOnSwamp = true
        // if (this.scene && this.scene.name === "moeras") {
        // this.fastOnSwamp = false;   // In de constructor
        // }

        // console.log(this.waterPosition)

        // this.scene.mainScene.playerUI.discoverySprites[1].discovered = true
    }

    onPreUpdate(engine) {

        let animSet = false;
        let speed = 300; // Langzamer in water, normaal op land
        let xspeed = 0;
        let yspeed = 0;
        let kb = engine.input.keyboard;


        // if (this.scene && this.scene.name === "moeras") {
        //     let isOnSwamp = false;
        //     if (this.scene && this.scene.swampAreas) {
        //         for (const area of this.scene.swampAreas) {
        //             // Simpele rechthoek-overlap check:
        //             if (
        //                 this.pos.x + this.width / 2 > area.pos.x - area.width / 2 &&
        //                 this.pos.x - this.width / 2 < area.pos.x + area.width / 2 &&
        //                 this.pos.y + this.height / 2 > area.pos.y - area.height / 2 &&
        //                 this.pos.y - this.height / 2 < area.pos.y + area.height / 2
        //             ) {
        //                 isOnSwamp = true;
        //                 break;
        //             }
        //         }
        //     }
        //     this.fastOnSwamp = isOnSwamp;

        // }



        // if (this.scene && this.scene.name === "moeras") {
        //     speed = this.fastOnSwamp ? 300 : 150;
        // }

        // if (this.fastOnSwamp === false) {
        //     speed = 150; // Langzamer in water, normaal op land
        //     xspeed = 0;
        //     yspeed = 0;

        //     // Gebruik deze speed voor je beweging:
        //     if (kb.isHeld(Keys.W)) {
        //         yspeed = -150;
        //         this.graphics.use('runup');
        //         animSet = true;
        //     }
        //     if (kb.isHeld(Keys.S)) {
        //         yspeed = 150;
        //         this.graphics.use('rundown');
        //         animSet = true;
        //     }
        //     if (kb.isHeld(Keys.A)) {
        //         xspeed = -150;
        //         this.graphics.use('runleft');
        //         animSet = true;
        //     }
        //     if (kb.isHeld(Keys.D)) {
        //         xspeed = 150;
        //         this.graphics.use('runright');
        //         animSet = true;
        //     }

        //     if (kb.wasPressed(Keys.Right)) this.catch();
        //     if (kb.wasPressed(Keys.Q)) this.interact();
        //     if (kb.wasPressed(Keys.Up)) this.layFood();
        // }



        if (sessionStorage.key === "tropen") {
            console.log("got an orchid")
        }

        // if (this.fastOnSwamp === true) {

        //     xspeed = 0;
        //     yspeed = 0;
        //     speed = 300;
        //     kb = engine.input.keyboard;

        animSet = false;
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
        if (engine.input.keyboard.wasPressed(Keys.Enter) && this.isNearDoor && this.doorTargetScene) {
            engine.goToScene(this.doorTargetScene);
            setTimeout(() => {
                this.canUseDoor = true;
            }, 2000);
        }

        if (engine.input.keyboard.wasPressed(Keys.Enter) && this.isNearBook) {
            const book = engine.currentScene.actors.find(a => a instanceof LabBook);
            if (book) {
                if (!book.popupBg) {
                    book.showPopup(engine);
                } else {
                    book.closePopup(engine);
                }
            }
        }

        if (kb.wasPressed(Keys.Right)) this.catch();
        if (kb.wasPressed(Keys.Q)) this.interact();
        if (kb.wasPressed(Keys.Up)) this.layFood();
        // }



        // console.log("fastContacts:", this.fastContacts, "fastOnSwamp:", this.fastOnSwamp);


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
        // if (this.isCollidingWithEnemy && Date.now() - this.lastHitTime >= 1000) {
        //     this.health -= this.collidingEnemy.attack;
        //     this.lastHitTime = Date.now();
        //     console.log(`Player health: ${this.health}`);
        // }

        // // Death check
        // if (this.health <= 0) {
        //     this.gameOver();
        // }

        // if (sessionStorage.key === "flower") {
        //     console.log("got an orchid")
        // }

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
            }
        }
    }


    hitFlower(event) {
        if (event.other.owner instanceof Orchid) {
            sessionStorage.setItem("tropen", "orchid")
            console.log("got Orchid")
            console.log(sessionStorage.getItem("flower"))
            this.flowercollection.push("orchid")
            event.other.owner.kill()
              console.log(this.scene.engine.playerProgress)
            this.scene.engine.playerProgress[2] = true
            
            this.flowerCount += 1

        }

        if (event.other.owner instanceof SwampRose) {
            console.log("got swampRose")
            sessionStorage.setItem("swamp", "swamprose")
            this.flowercollection.push("swamprose")
            console.log(sessionStorage.getItem("swamp"))

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
            this.canLayFood = false
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
