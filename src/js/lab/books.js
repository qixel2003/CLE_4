import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Books extends Actor {
    constructor() {
        super({
            width: Resources.Books.width,
            height: Resources.Books.height,
            collisionType: CollisionType.Fixed
        })

        this.graphics.use(Resources.Books.toSprite());
        this.pos = new Vector(450, 475);
        this.scale = new Vector(1, 1)

    }
}