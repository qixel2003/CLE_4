import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Brokenpotplant extends Actor {
    constructor() {
        super({
            width: Resources.Brokenpotplant.width,
            height: Resources.Brokenpotplant.height,
            collisionType: CollisionType.Fixed
        })

        this.graphics.use(Resources.Brokenpotplant.toSprite());
        this.pos = new Vector(100, 150);
        this.scale = new Vector(2, 2)

    }
}