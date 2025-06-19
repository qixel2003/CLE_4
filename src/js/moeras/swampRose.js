import { Actor, Engine, Vector, CollisionType, Shape } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class SwampRose extends Actor {

    constructor() {
        super({ 
            width: Resources.SwampRose.width, 
            height: Resources.SwampRose.height, 
            collisionType: CollisionType.Fixed 
        })
        
        this.graphics.use(Resources.SwampRose.toSprite())
        this.pos = new Vector(500, 300)
        this.scale = new Vector(0.05, 0.05)
        // this.collider.set(Shape.Box(20, 10, Vector.Zero, new Vector(-30, 40)));

    }



}