import { Actor, Engine, Vector, CollisionType } from "excalibur"
import { Resources, ResourceLoader } from '../resources.js'

export class BlueBush extends Actor {

    constructor() {
        super({ width: Resources.Bluebush.width, height: Resources.Bluebush.height, collisionType: CollisionType.Passive })
        this.graphics.use(Resources.Bluebush.toSprite())
        this.pos = new Vector(500, 300)
        this.scale = new Vector(1.5, 1.5)

    }



}