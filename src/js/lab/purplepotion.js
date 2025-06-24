import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Purplepotion extends Actor {
    constructor() {
        super({ width: Resources.Purplepotion.width, height: Resources.Purplepotion.height, collisionType: CollisionType.PreventCollision })

        this.graphics.use(Resources.Purplepotion.toSprite());
        this.pos = new Vector(750, 820);
        this.scale = new Vector(2,2)
        this.z = 50
    }
}