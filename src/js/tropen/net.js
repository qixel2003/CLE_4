import { Actor, Engine, Vector, CollisionType, Shape } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Net extends Actor {

    maxDistance = 200; // distance in pixels
    distanceTraveled = 0;
    stopped = false;
    startPos = new Vector(500, 300)
    direction = new Vector(1, 0)
    frameCounter

    constructor(startPos, direction) {
        super({ 
            width: Resources.Net.width, 
            height: Resources.Net.height, 
            collisionType: CollisionType.Passive 
        })

        this.graphics.use(Resources.Net.toSprite())
        // let direction = new Vector(1, 0)

        this.pos = startPos.clone();
        this.scale = new Vector(1, 1);

        this.startPos = startPos.clone();
        this.vel = direction.scale(600);
        this.collider.set(Shape.Box(20, 20, Vector.Zero, new Vector(-10, -15)));

        this.frameCounter = 0

    }

    onPreUpdate(engine, delta) {
        if (!this.stopped) {
            this.distanceTraveled = this.pos.distance(this.startPos);
            if (this.distanceTraveled >= this.maxDistance) {
                this.vel = Vector.Zero; // Stop the net
                this.stopped = true;

                    this.kill()
            
            }
        }
    }



}