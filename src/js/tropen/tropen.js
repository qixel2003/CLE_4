import { Actor, BoundingBox, Color, Rectangle, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { Palmtree } from './tree.js'
import { Player } from '../player.js'
import { PurpleBush } from './purplebush.js'
import { PurpleBushBerries } from './purplebushberries.js'
import { Monkey } from './monkey.js'
import { Orchid } from './flower.js'
import { YellowStone } from "./yellowstone.js";
import { TropenBackground } from "./background.js";
import { TropenDoor } from "./door.js";
import { TropenBorderLeft } from "./tropenBorderLeft.js";
import { TropenBorderRight } from "./tropenBorderRight.js";
import { TropenBorderTop } from "./tropenBorderTop.js";
import { TropenBorderBottom } from "./tropenBorderBottom.js";


export class TropenScene extends Scene {

    name


    constructor() {
        super()

        this.name = "tropen"
    }

    onActivate(ctx, engine, event) {
        this.clear();

        const tropenbg = new TropenBackground({ pos: new Vector(0, 0) });
        this.add(tropenbg)

        // const bubble = new Actor({ pos: new Vector(640, 360) });
        // bubble.graphics.use(Resources.Bubble.toSprite());
        // bubble.on("pointerup", () => {
        //     ctx.engine.goToScene('game');
        // });
        // this.add(bubble);


        let tropenDoor = new TropenDoor();
        this.add(tropenDoor)

        // this.createPlayer()
        const player = new Player();
        this.add(player)

        let monkey = new Monkey()
        this.add(monkey)

        this.obstaclePositions = [];

        this.positionObstacle(PurpleBush, 4, this.obstaclePositions)
        this.positionObstacle(PurpleBushBerries, 4, this.obstaclePositions)
        this.positionObstacle(Orchid, 1, this.obstaclePositions)
        this.positionObstacle(YellowStone, 6, this.obstaclePositions)
        this.positionObstacle(Palmtree, 5, this.obstaclePositions)





        // const player = new Player()
        // this.add(player)
        this.pos = new Vector(300, 60);
        this.width = new Vector(30, 0)
        this.height = new Vector(30, 0)


        const minX = 0;
        const maxX = 1240;
        const minY = 0;
        const maxY = 920;

        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(minX, minY, maxX, maxY));
        this.camera.zoom = 1.35;

        let tropenBorderLeft = new TropenBorderLeft();
        this.add(tropenBorderLeft)

        let tropenBorderRight = new TropenBorderRight();
        this.add(tropenBorderRight)

        let tropenBorderTop = new TropenBorderTop();
        this.add(tropenBorderTop)

        let tropenBorderBottom = new TropenBorderBottom();
        this.add(tropenBorderBottom)
    }



    positionObstacle(ObstacleClass, number, positions) {
        const obstacleCount = number
        const width = 1240
        const height = 920
        // let minDistance = 100;
        // let positions = [];
        const obstacleSize = 100
        const margin = obstacleSize / 2;
        const minDistance = obstacleSize

        function isFarEnough(x, y) {
            for (let i = 0; i < positions.length; i++) {
                let pos = positions[i];
                let dx = pos.x - x;
                let dy = pos.y - y;
                if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
                    return false;
                }
            }
            return true;
        }

        let placed = 0;
        // ...existing code...
        while (placed < obstacleCount) {
            let x = margin + Math.random() * (width - 2 * margin);
            let y = margin + Math.random() * (height - 2 * margin);

            // Check if any part of the obstacle would overlap the forbidden zone
            if (
                x + margin > 300 && x - margin < 700 &&
                y + margin > 250 && y - margin < 600
            ) {
                continue;
            }

            if (isFarEnough(x, y)) {
                let obstacle = new ObstacleClass();
                obstacle.pos = new Vector(x, y);
                this.add(obstacle);
                console.log(x,y)
                positions.push({ x: x, y: y });
                placed++;
            }
        }
        // ...existing code...
    }
}

// createPlayer() {
//     const player = new Player()
//     this.add(player)
//     this.add(player)
//     console.log("spawn");
//     console.log(player);
// }

