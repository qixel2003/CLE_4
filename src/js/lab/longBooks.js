import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class LongBooks extends Actor {
    constructor() {
        super({
            width: Resources.LongBooks.width,
            height: Resources.LongBooks.height,
            collisionType: CollisionType.Fixed
        })

        this.graphics.use(Resources.LongBooks.toSprite());
        this.pos = new Vector(150, 825);
        this.scale = new Vector(1, 1)

    }
}