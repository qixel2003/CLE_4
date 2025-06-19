import { Actor, Engine, Vector, CollisionType, Shape } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Grasblue extends Actor {

    constructor() {
        super({width: Resources.Grasblue.width, height: Resources.Grasblue.height, collisionType: CollisionType.Fixed})
        this.graphics.use(Resources.Grasblue.toSprite())
         this.pos = new Vector(500, 300)
         this.scale = new Vector(0.3, 0.3)

         this.collider.set(
                     Shape.Box(300, 100, Vector.Zero, new Vector(-50, 10))
                 );
        
    }
    
    

}