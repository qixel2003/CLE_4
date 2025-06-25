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
        const hasPurplesaks = sessionStorage.getItem("pool") === "purplesaks";
        const hasMonkey = sessionStorage.getItem("tropenanimal") === "monkey";
        const hasCapybara = sessionStorage.getItem("moerasanimal") === "capybara";
        const hasPenguin = sessionStorage.getItem("poolanimal") === "penguin";

        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            console.log("Enter key detected at all");
        }

        if (this.playerIsTouching && hasSwamprose && hasOrchid && hasPurplesaks && hasMonkey && hasCapybara && hasPenguin && engine.input.keyboard.wasPressed(Keys.Enter)) {
            console.log("Enter pressed while touching mixer and all items collected!");
            engine.goToScene('end');
        }
    }
}