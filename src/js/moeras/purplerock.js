import { Actor, Scene, Vector, CollisionType, Shape } from "excalibur";
import { Resources } from "../resources.js";

export class Purplerock extends Actor {

    constructor() {
        super({ 
            width: Resources.Purplerock.width, 
            height: Resources.Purplerock.height, 
            collisionType: CollisionType.Fixed 
        })
        
        this.graphics.use(Resources.Purplerock.toSprite())
        this.pos = new Vector(500, 300)
        this.scale = new Vector(0.2, 0.2)
        this.collider.set(Shape.Box(300, 200, Vector.Zero, new Vector(-30, 0)));

    }



}