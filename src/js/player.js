import { Actor, Engine, Vector, Keys, CollisionType, SpriteSheet, range, Animation, Axes, Buttons, Shape } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Monkey } from './tropen/monkey.js'
import { Orchid } from './tropen/flower.js'
import { Net } from './tropen/net.js'
import { Food } from './moeras/food.js'
import { SwampRose } from './moeras/swampRose.js'
import { Purplesaks } from './poolgebied/purplesaks.js'
import { Penguin } from './poolgebied/penguin.js'
import { Capybara } from './moeras/capybara.js'



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
    canLayFood;
    flowercollection;


    constructor(health = 3) {
        super({
            width: Resources.Player.width,
            height: Resources.Player.height,
            collisionType: CollisionType.Active
        });

        this.isReadingBook = false;
        this.health = health;
        this.startHealth = health;
        this.baseSpeed = 300;
        this.statusEffect = null;
        this.statusSpeedMultiplier = 1;
        this.statusExpireTime = 0;
        this.lastInteractTime = 0;
        this.interactCooldown = 500;
        this.spawnPos = new Vector(500, 300);


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


        this.isWalking = false;
        this.walkSoundInstance = null;


    }

    onPreUpdate(engine) {

        let animSet = false;
        let xspeed = 0;
        let yspeed = 0;
        let kb = engine.input.keyboard;
        let speed = this.baseSpeed * this.statusSpeedMultiplier;

        if (this.isReadingBook) {
            this.vel = new Vector(0, 0);
            return;
        }


        // Expire status effect
        if (this.statusEffect && Date.now() > this.statusExpireTime) {
            console.log(`Status ${this.statusEffect} expired`);
            this.statusEffect = null;
            this.statusSpeedMultiplier = 1;
        }




        if (sessionStorage.key === "tropen") {
            console.log("got an orchid")
        }


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

            if (gamepad.isButtonPressed(Buttons.Face1)) this.jump(); //X this.jump()
            if (gamepad.isButtonPressed(Buttons.Face2)) this.catch(); //◯
            if (gamepad.isButtonPressed(Buttons.Face3)) this.interact(); //▢
            if (gamepad.isButtonPressed(Buttons.Face4)) this.layFood(); //△ldow

            if (gamepad.isButtonPressed(Buttons.Face3) && this.isNearDoor && this.doorTargetScene) {
                engine.goToScene(this.doorTargetScene);
                setTimeout(() => {
                    this.canUseDoor = true;
                }, 2000);
            }

            if (gamepad.isButtonPressed(Buttons.Face3) && this.isNearBook) {
                const book = engine.currentScene.actors.find(a => a instanceof LabBook);
                if (book) {
                    if (!book.popupBg) {
                        book.showPopup(engine);
                    } else {
                        book.closePopup(engine);
                    }
                }
            }
        }

        // Final velocity clamp
        let vel = new Vector(xspeed, yspeed);
        if (!vel.equals(Vector.Zero)) {
            vel = vel.normalize().scale(speed);
        } else if (!animSet) {
            this.graphics.use('idle');
        }

        this.vel = vel;


        let wasWalking = this.isWalking;
        this.isWalking = xspeed !== 0 || yspeed !== 0;


        // Play walking sound if started walking
        if (this.isWalking && !wasWalking) {
            const sound = this.getWalkSound();
            if (sound) {
                sound.loop = true;
                sound.play();
                this.walkSoundInstance = sound;
            }
        }
        // Stop walking sound if stopped
        if (!this.isWalking && wasWalking && this.walkSoundInstance) {
            this.walkSoundInstance.stop();
            this.walkSoundInstance = null;
        }


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
        this.on('collisionstart', (event) => this.hitCapybara(event));
        this.on('collisionend', (event) => this.hitPenguin(event));


    }

    // onActivate(ctx){
    //     if(this.takeDamage()){
    //     Resources.BackgroundDamage.play();
    //     this.clear();
    //     }
    // }


    hitMonkey(event) {
        if (event.other.owner instanceof Monkey) {
            this.takeDamage(1)
            console.log("player lost a life")
        }
    }

    hitCapybara(event) {
        if (event.other.owner instanceof Capybara) {
            this.takeDamage(1)
            console.log("player lost a life")
        }
    }

    hitPenguin(event) {
        if (event.other.owner instanceof Penguin) {
                Resources.PickUp.play();

            sessionStorage.setItem("poolanimal", "penguin")
            console.log("got Penguin")
            event.other.owner.kill()
            this.scene.engine.playerProgress[2] = true

        }
    }


    hitFlower(event) {
        if (event.other.owner instanceof Orchid) {
                Resources.PickUp.play();
            sessionStorage.setItem("tropen", "orchid")
            console.log("got Orchid")

            this.flowercollection.push("orchid")
            event.other.owner.kill()
            console.log(this.scene.engine.playerProgress)
            this.scene.engine.playerProgress[3] = true
            this.nearbyFlower = event.other.owner;

            this.flowerCount += 1

        }

        if (event.other.owner instanceof SwampRose) {
                Resources.PickUp.play();

            console.log("hit SwampRose");
            this.nearbyFlower = event.other.owner;
        }

        if (event.other.owner instanceof Purplesaks) {
                Resources.PickUp.play();

            console.log("got purplesaks")
            sessionStorage.setItem("pool", "purplesaks")

            this.nearbyFlower = event.other.owner;

            this.scene.engine.playerProgress[5] = true
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

    catch() {
        const now = Date.now();
        if (now - this.lastInteractTime < this.interactCooldown) {
            return; // Still on cooldown
        }
        this.lastInteractTime = now;
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
        const now = Date.now();
        if (now - this.lastInteractTime < this.interactCooldown) {
            return; // Still on cooldown
        }
        this.lastInteractTime = now;
        if (this.scene && ["tropen", "moeras", "pool", "savanne"].includes(this.scene.name)) {
            const food = new Food(this.pos.clone());
            this.scene.add(food);
            this.canLayFood = false
        }
    }

    interact() {
        const now = Date.now();
        if (now - this.lastInteractTime < this.interactCooldown) {
            return; // Still on cooldown
        }
        this.lastInteractTime = now;

        console.log("Interact action triggered");
        if (this.nearbyFlower) {
            this.flowerInteract();
        }
    }


    flowerInteract() {
        if (this.nearbyFlower) {
            this.flowerCount += 1;
            console.log("Picked up flower! Total:", this.flowerCount);

            if (this.nearbyFlower instanceof Orchid) {
                sessionStorage.setItem("tropen", "orchid");
                this.flowercollection.push("orchid");
                this.scene.engine.playerProgress[3] = true;
                console.log("Got Orchid");
            } else if (this.nearbyFlower instanceof SwampRose) {
                sessionStorage.setItem("swamp", "swamprose");
                this.flowercollection.push("swamprose");
                this.scene.engine.playerProgress[4] = true;
                console.log("Got SwampRose");
            } else if (this.nearbyFlower instanceof Purplesaks) {
                sessionStorage.setItem("pool", "purplesaks");
                this.flowercollection.push("purplesaks");
                this.scene.engine.playerProgress[5] = true;
                console.log("Got Purplesaks");
            }

            this.nearbyFlower.kill();
            this.nearbyFlower = null;
        }
    }




    applyStatus(statusName, duration = 3000) {
        this.statusEffect = statusName;
        this.statusExpireTime = Date.now() + duration;
        console.log("start");

        switch (statusName) {
            case "slowed":
                this.statusSpeedMultiplier = 0.5; // Half speed
                break;
            case "fast":
                this.statusSpeedMultiplier = 1.5; // Faster than normal
                break;
            default:
                this.statusSpeedMultiplier = 1;
                break;
        }

        console.log(`Applied status: ${statusName}`);
    }



    takeDamage() {

        Resources.Damage.play();

        this.health -= 1;
        this.pos = this.spawnPos.clone();

        console.log("Damage taken");
        let flashes = 6;
        let flashInterval = setInterval(() => {
            this.graphics.opacity = this.graphics.opacity === 1 ? 0.2 : 1;
            flashes--;
            if (flashes <= 0) {
                clearInterval(flashInterval);
                this.graphics.opacity = 1;
            }
        }, 100);
        if (this.health <= 0) {
            Resources.Damage.stop();
            this.gameOver();
        }
    }

    onCollisionStart(event) {
        console.log('Geraakt door:', event.other);
    }

    onCollisionEnd(event) {

    }


    getWalkSound() {
        switch (this.scene.name) {
            case "lab": // or "lab", depending on your naming
                return Resources.WalkingSoundLab;
            case "tropen":
                return Resources.WalkingSoundTropen;
            case "pool":
                return Resources.WalkingSoundPoolgebied;
            case "moeras":
                return Resources.WalkingSoundMoeras;
            default:
                return null;
        }
    }

    onDeactivate() {
    
    const player = this.actors.find(a => a instanceof Player);
    if (player && player.walkSoundInstance) {
        player.walkSoundInstance.stop();
        player.walkSoundInstance = null;
    }

}

    onExit(_scene) {
        if (this.walkSoundInstance) {
            this.walkSoundInstance.stop();
            this.walkSoundInstance = null;
        }
    }


    gameOver() {

        Resources.Died.play()

        let flashes = 6;
        let flashInterval = setInterval(() => {
            this.graphics.opacity = this.graphics.opacity === 1 ? 0.2 : 1;
            flashes--;
            if (flashes <= 0) {
                clearInterval(flashInterval);
                this.graphics.opacity = 1;
                this.scene.engine.goToScene('game');
                this.health = this.startHealth;
            }
        }, 100);
    }
}
