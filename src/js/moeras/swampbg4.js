import { Actor, Engine, Vector, CollisionType, Shape, CompositeCollider } from "excalibur"
import { Resources } from "../resources.js";
import { Player } from '../player.js'


export class SwampBackground4 extends Actor {
    constructor() {
        super({
            width: Resources.Swampbg4.width,
            height: Resources.Swampbg4.height,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {


        const sprite = Resources.Swampbg4.toSprite();
        sprite.width = 950;
        sprite.height = 700;
        this.pos = new Vector(1240 / 2, 920 / 2)
        sprite.scale = new Vector(1.35, 1.35);
        this.graphics.use(sprite);


        this.collider.set(Shape.Box(110, 50, Vector.Zero, new Vector(415, -50)));
        this.on('collisionstart', (evt) => {
            const player = engine.currentScene.actors.find(a => a instanceof Player);
            if (player) {
                player.applyStatus("slowed", 5000);
            }

        });

    }
}