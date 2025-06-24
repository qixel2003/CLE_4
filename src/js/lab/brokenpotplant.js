import { Actor, CollisionType, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Brokenpotplant extends Actor {
    constructor(x,y) {
        super({ 
            width: Resources.Brokenpotplant.width, 
            height: Resources.Brokenpotplant.height, 
            collisionType: CollisionType.Fixed 
        })

        this.graphics.use(Resources.Brokenpotplant.toSprite());
        this.pos = new Vector(x, y); //25.85
        this.scale = new Vector(1.8,2)
    }
}