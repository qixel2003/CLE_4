import { Actor, Scene, Vector, CollisionType, Shape } from "excalibur";
import { Resources } from "../resources.js";

export class SnowMan extends Actor {

    constructor() {
        super({ 
            width: Resources.SnowMan.width, 
            height: Resources.SnowMan.height, 
            collisionType: CollisionType.Fixed 
        })
        
        this.graphics.use(Resources.SnowMan.toSprite())
        this.pos = new Vector(500, 300)
        this.scale = new Vector(2.5, 2.5)
        this.collider.set(Shape.Box(20, 10, Vector.Zero, new Vector(-30, 20)));

    }



}