import { Actor, CollisionType, Color, Font, Graphic, Label, Rectangle, Buttons, Shape, Vector, Keys } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class Mixer extends Actor {
    constructor() {
        super({ width: Resources.Bones.width, height: Resources.Bones.height, collisionType: CollisionType.Passive });
        this.graphics.use(Resources.Fish.toSprite());
        this.scale = new Vector(0.75, 0.75)
        this.collider.set(Shape.Box(90, 120));
        this.pos = new Vector(600, 700);


    }

    // onActivate(ctx) {
    //     console.log(sessionStorage.getItem("orchid"));
    // }

    onPreUpdate(engine, delta) {
        const hasSwamprose = sessionStorage.getItem("swamp") !== null;
        const hasOrchid = sessionStorage.getItem("tropen") !== null;

        if (hasSwamprose && hasOrchid && engine.input.keyboard.wasPressed(Keys.Enter)) {
            console.log("Enter pressed and you have swamprose and orchid!");
        }
    }
}