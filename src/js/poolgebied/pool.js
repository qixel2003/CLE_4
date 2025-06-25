import { Actor, BoundingBox, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { PoolDoor } from "./door.js";
import { Player } from "../player.js";
import { PoolBorderLeft } from "./poolBorderLeft.js";
import { PoolBorderRight } from "./poolBorderRight.js";
import { PoolBorderTop } from "./poolBorderTop.js";
import { PoolBorderBottom } from "./poolBorderBottom.js";
import { PoolBackground } from "./background.js";
import { SnowMountain } from "./snowMountain.js";
import { SnowPile } from "./snowpile.js";
import { SnowMan } from "./snowman.js";
import { Purplesaks } from "./purplesaks.js";
import { Penguin } from "./penguin.js";
import { UI } from "../UI.js";







export class PoolScene extends Scene {

    name

    constructor() {
        super()

        this.name = "pool"
    }


    onActivate(ctx) {
        Resources.BackgroundMusicPoolgebied.loop = true;
        Resources.BackgroundMusicPoolgebied.play();
        this.clear();

        Resources.BackgroundMusicMoeras.isStopped = true;

        const poolbg = new PoolBackground({ pos: new Vector(0, 0) });
        this.add(poolbg)

        let poolDoor = new PoolDoor();
        this.add(poolDoor)

        const player = new Player();
        this.pos = new Vector(300, 60);
        this.width = new Vector(30, 0)
        this.height = new Vector(30, 0)
        this.add(player)

        let penguin = new Penguin()
        this.add(penguin)

        this.obstaclePositions = []


        this.positionObstacle(SnowMountain, 8, this.obstaclePositions)
        this.positionObstacle(SnowPile, 4, this.obstaclePositions)
        this.positionObstacle(SnowMan, 6, this.obstaclePositions)
        this.positionObstacle(Purplesaks, 1, this.obstaclePositions)


        const minX = 0;
        const maxX = 1240;
        const minY = 0;
        const maxY = 920;

        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(minX, minY, maxX, maxY));
        this.camera.zoom = 1.35;

        let poolBorderLeft = new PoolBorderLeft();
        this.add(poolBorderLeft)

        let poolBorderRight = new PoolBorderRight();
        this.add(poolBorderRight)

        let poolBorderTop = new PoolBorderTop();
        this.add(poolBorderTop)

        let poolBorderBottom = new PoolBorderBottom();
        this.add(poolBorderBottom)

        const playerUI = new UI(player)
        this.add(playerUI)
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

                obstacle.z = 2;

                this.add(obstacle);
                console.log(x, y)
                positions.push({ x: x, y: y });
                placed++;
            }
        }

    }

    onDeactivate() {
        Resources.BackgroundMusicPoolgebied.stop();
    }
}
