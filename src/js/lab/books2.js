import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Books2 extends Actor {
    constructor() {
        super({
            width: Resources.Books2.width,
            height: Resources.Books2.height,
            collisionType: CollisionType.Fixed
        })

        this.graphics.use(Resources.Books2.toSprite());
        this.pos = new Vector(1150, 825);
        this.scale = new Vector(1, 1)

    }
}