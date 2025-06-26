import { Actor, CollisionType, Color, Rectangle, Shape, Vector } from "excalibur";
import { Resources } from "./resources";

export class Trigger extends Actor {
    constructor() {
        super({
            width: Resources.Trigger.width, 
            height: Resources.Trigger.height, 
            collisionType: CollisionType.Passive })

        this.graphics.use(Resources.Trigger.toSprite())
        this.pos = new Vector(800,600)
    }

     
}