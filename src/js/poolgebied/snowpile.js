import { Actor, Scene, Vector, CollisionType, Shape } from "excalibur";
import { Resources } from "../resources.js";

export class SnowPile extends Actor {

    constructor() {
        super({ 
            width: Resources.SnowPile.width, 
            height: Resources.SnowPile.height, 
            collisionType: CollisionType.Fixed 
        })
        
        this.graphics.use(Resources.SnowPile.toSprite())
        this.pos = new Vector(500, 300)
        this.scale = new Vector(1, 1)
        this.collider.set(Shape.Box(100, 30, Vector.Zero, new Vector(-70, -10)));

    }



}