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

    onInitialize(engine) {
        console.log("swamp:", sessionStorage.getItem("swamp"));
        console.log("tropen:", sessionStorage.getItem("tropen"));
        console.log("tropenanimal:", sessionStorage.getItem("tropenanimal"));
        console.log("moerasanimal:", sessionStorage.getItem("moerasanimal"));

        this.playerIsTouching = false;

        this.on('collisionstart', (evt) => {
            if (evt.other.owner instanceof Player) {
                this.playerIsTouching = true;
            }
        });


        this.on('collisionend', (evt) => {
            if (evt.other.owner instanceof Player) {
                this.playerIsTouching = false;
            }
        });
    }

    onPreUpdate(engine, delta) {
        const hasSwamprose = sessionStorage.getItem("swamp") === "swamprose";
        const hasOrchid = sessionStorage.getItem("tropen") === "orchid";
        const hasMonkey = sessionStorage.getItem("tropenanimal") === "monkey";
        const hasCapybara = sessionStorage.getItem("moerasanimal") === "capybara";

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            console.log("Enter key detected at all");
        }

        if (this.playerIsTouching && hasSwamprose && hasOrchid && hasMonkey && hasCapybara && engine.input.keyboard.wasPressed(Keys.Enter)) {
            console.log("Enter pressed while touching mixer and all items collected!");
            engine.goToScene('end');
        }
    }
}