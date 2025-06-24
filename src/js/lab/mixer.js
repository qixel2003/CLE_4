import { Actor, CollisionType, Color, Font, Graphic, Label, Rectangle, Buttons, Shape, Vector, Keys } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class Mixer extends Actor {
    constructor() {
        super({ width: Resources.Antidotetable.width, height: Resources.Antidotetable.height, collisionType: CollisionType.Passive });
        this.graphics.use(Resources.Antidotetable.toSprite());
        this.scale = new Vector(1, 1)
        this.collider.set(Shape.Box(90, 120));
        this.pos = new Vector(601, 820);
        this.z = 50

    }

    // onActivate(ctx) {
    //     console.log(sessionStorage.getItem("orchid"));
    // }

    onPreUpdate(engine, delta) {
        const hasSwamprose = sessionStorage.getItem("swamp") !== null;
        const hasOrchid = sessionStorage.getItem("tropen") !== null;
    }
}