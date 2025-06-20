import { Actor, Engine, Vector, Keys, CollisionType, SpriteSheet, range, Animation, Axes, Buttons, Shape } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Capyfiona extends Actor {

    animalCount

    constructor() {
        super({
            width: Resources.Capyfiona.width,
            height: Resources.Capyfiona.height,
            collisionType: CollisionType.Passive
        });

        this.scale = new Vector(1.3, 1.3);
        this.pos = new Vector(220, 300);
        this.graphics.use(Resources.Capyfiona.toSprite())


    }

    onInitialize(engine) {
        this.speed = 100; 
        this.direction = 1; 
        this.upperBound = 200; 
        this.lowerBound = 500; 
    }

    onPreUpdate(engine, delta) {


        this.pos.y += this.direction * this.speed * (delta / 1000);


        if (this.pos.y >= this.lowerBound) {
            this.direction = -1;
            this.graphics.flipHorizontal = true
        }
        if (this.pos.y <= this.upperBound) {
            this.direction = 1;
             this.graphics.flipHorizontal = false
        }
    }


    

    }

