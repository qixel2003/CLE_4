import { Actor, Engine, Vector, CollisionType, Shape } from "excalibur"
import { Resources } from "../resources.js";

export class SwampBackground extends Actor {
    constructor() {
        super({
            width: Resources.Swampbg.width,
            height: Resources.Swampbg.height,
            collisionType: CollisionType.PreventCollision
        });
    }

    onInitialize(engine) {

        const sprite = Resources.Swampbg.toSprite();
        sprite.width = 950;
        sprite.height = 700;
        this.pos = new Vector(1240 / 2, 920 / 2)
        sprite.scale = new Vector(1.35, 1.35);
        this.graphics.use(sprite);
        // this.anchor = Vector.Half;
        // this.pos = new Vector(engine.drawWidth / 2, engine.drawHeight / 2);
        // const sprite = Resources.Tropenbg.toSprite();
        // sprite.width = engine.drawWidth;
        // sprite.height = engine.drawHeight;
        // this.graphics.use(sprite);
    }
}