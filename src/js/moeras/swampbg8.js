import { Actor, Engine, Vector, CollisionType, Shape, CompositeCollider } from "excalibur"
import { Resources } from "../resources.js";

export class SwampBackground8 extends Actor {
    constructor() {
        super({
            width: Resources.Swampbg8.width,
            height: Resources.Swampbg8.height,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {


        const sprite = Resources.Swampbg8.toSprite();
        sprite.width = 950;
        sprite.height = 700;
        this.pos = new Vector(1240 / 2, 920 / 2)
        sprite.scale = new Vector(1.35, 1.35);
        this.graphics.use(sprite);


        this.collider.set(Shape.Box(300, 200, Vector.Zero, new Vector(250, 110)));
        

    }
}