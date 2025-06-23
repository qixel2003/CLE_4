import { Actor, Engine, Vector, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class Lilypad extends Actor {

    constructor() {
        super({ width: Resources.Lilypad.width, height: Resources.Lilypad.height, collisionType: CollisionType.Passive })
        this.graphics.use(Resources.Lilypad.toSprite())
        this.pos = new Vector(500, 300)
        this.scale = new Vector(0.5, 0.5)

    }



}