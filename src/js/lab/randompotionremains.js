import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Randompotionremains extends Actor {
    constructor() {
        super({ width: Resources.Randompotionsremains.width, height: Resources.Randompotionsremains.height, collisionType: CollisionType.Fixed })

        this.graphics.use(Resources.Randompotionsremains.toSprite());
        this.pos = new Vector(380, 840);
        this.scale = new Vector(2,2)
        this.z = 51
    }
}