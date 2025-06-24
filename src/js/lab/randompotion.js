import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Randompotion extends Actor {
    constructor() {
        super({ width: Resources.Randompotions.width, height: Resources.Randompotions.height, collisionType: CollisionType.PreventCollision })

        this.graphics.use(Resources.Randompotions.toSprite());
       this.pos = new Vector(400, 810);
       this.scale = new Vector(2,2)
       this.z = 50
    }
}