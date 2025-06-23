import { Actor, Vector, CollisionType, Shape } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from '../player.js'; 

export class SwampBackground2 extends Actor {
    constructor() {
        super({
            width: Resources.Swampbg2.width,
            height: Resources.Swampbg2.height,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {
        const sprite = Resources.Swampbg2.toSprite();
        sprite.width = 950;
        sprite.height = 700;
        sprite.scale = new Vector(1.35, 1.35);
        this.pos = new Vector(1240 / 2, 920 / 2);
        this.graphics.use(sprite);

        // Define collision zone
        this.collider.set(Shape.Box(220, 85, Vector.Zero, new Vector(-170, -360)));

        // Apply status effect to the player
        // Apply status effect to the player
        this.on('collisionstart', (evt) => {
            const player = engine.currentScene.actors.find(a => a instanceof Player);
            if (player) {
                player.applyStatus("slowed", 5000);
            }

        });
    }
}
