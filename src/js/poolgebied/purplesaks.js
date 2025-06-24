import { Actor, Engine, Vector, CollisionType, Shape } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Purplesaks extends Actor {

    constructor() {
        super({ 
            width: Resources.Purplesaks.width, 
            height: Resources.Purplesaks.height, 
            collisionType: CollisionType.Passive 
        })
        
        this.graphics.use(Resources.Purplesaks.toSprite())
        this.pos = new Vector(500, 300)
        this.scale = new Vector(0.08, 0.08)
        // this.collider.set(Shape.Box(10, 5, Vector.Zero, new Vector(0,0)));

    }



}