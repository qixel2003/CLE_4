import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class LongBooks2 extends Actor {
    constructor() {
        super({
            width: Resources.LongBooks2.width,
            height: Resources.LongBooks2.height,
            collisionType: CollisionType.Fixed
        })

        this.graphics.use(Resources.LongBooks2.toSprite());
        this.pos = new Vector(950, 825);
        this.scale = new Vector(1, 1)

    }
}