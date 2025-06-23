import { Actor, Engine, Vector, CollisionType, Shape, CompositeCollider } from "excalibur"
import { Resources } from "../resources.js";
import { Player } from '../player.js'


export class SwampBackground1 extends Actor {
    constructor() {
        super({
            width: Resources.Swampbg1.width,
            height: Resources.Swampbg1.height,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {


        const sprite = Resources.Swampbg1.toSprite();
        sprite.width = 950;
        sprite.height = 700;
        this.pos = new Vector(1240 / 2, 920 / 2)
        sprite.scale = new Vector(1.35, 1.35);
        this.graphics.use(sprite);


        this.collider.set(Shape.Box(440, 140, Vector.Zero, new Vector(-650, -475)));
        

        this.on('collisionstart', (evt) => {
            const player = evt.other;
            if (player instanceof Player) {
                player.applyStatus("slowed", 5000); // 5 seconds of slow
            }
        });
    }
}