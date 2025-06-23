import { Actor, Engine, Vector, CollisionType, Shape, CompositeCollider } from "excalibur"
import { Resources } from "../resources.js";

export class SwampBackground3 extends Actor {
    constructor() {
        super({
            width: Resources.Swampbg3.width,
            height: Resources.Swampbg3.height,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {


        const sprite = Resources.Swampbg3.toSprite();
        sprite.width = 950;
        sprite.height = 700;
        this.pos = new Vector(1240 / 2, 920 / 2)
        sprite.scale = new Vector(1.35, 1.35);
        this.graphics.use(sprite);


        this.collider.set(Shape.Box(280, 250, Vector.Zero, new Vector(230, -400)));
        // Apply status effect to the player
            this.on('collisionstart', (evt) => {
                const player = engine.currentScene.actors.find(a => a instanceof Player);
                if (player) {
                    player.applyStatus("slowed", 5000);
                }

            });

    }
}