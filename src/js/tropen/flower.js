import { Actor, Engine, Vector, CollisionType, Shape } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Orchid extends Actor {

    constructor() {
        super({ 
            width: Resources.Orchid.width, 
            height: Resources.Orchid.height, 
            collisionType: CollisionType.Fixed
        })
        
        this.graphics.use(Resources.Orchid.toSprite())
        this.pos = new Vector(500, 300)
        this.scale = new Vector(0.052, 0.052)
        // this.collider.set(Shape.Box(20, 10, Vector.Zero, new Vector(-30, 40)));

    }



}