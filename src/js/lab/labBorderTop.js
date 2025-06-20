import { Actor, CollisionType, Color, Rectangle, Shape, Vector } from "excalibur";

export class LabBorderTop extends Actor {
    constructor() {
        super({})
        this.graphics.use(new Rectangle({ width: 20, height: 950, color: Color.Transparent }));
        this.pos = new Vector(0, 530);
        this.body.collisionType = CollisionType.Fixed
        this.collider.set(
            Shape.Box(1240, 2, Vector.Zero, new Vector(0, -400))
        );
    }
}