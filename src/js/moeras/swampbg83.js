import { Actor, Engine, Vector, CollisionType, Shape, CompositeCollider } from "excalibur"
import { Resources } from "../resources.js";
import { Player } from '../player.js'

export class SwampBackground83 extends Actor {
    constructor() {
        super({
            width: Resources.Swampbg83.width,
            height: Resources.Swampbg83.height,
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {


        const sprite = Resources.Swampbg83.toSprite();
        sprite.width = 950;
        sprite.height = 700;
        this.pos = new Vector(1240 / 2, 920 / 2)
        sprite.scale = new Vector(1.35, 1.35);
        this.graphics.use(sprite);


        this.collider.set(Shape.Box(300, 100, Vector.Zero, new Vector(-230, 275)));
        this.on('collisionstart', (evt) => {
            const player = engine.currentScene.actors.find(a => a instanceof Player);
            if (player) {
                player.applyStatus("slowed", 5000);
            }

        });

    }
}