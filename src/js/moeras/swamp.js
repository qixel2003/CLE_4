import { Actor, BoundingBox, Scene, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js"
import { Capybara } from "./capybara.js"
import { UI } from "../UI.js"
import { SwampBorderLeft } from "./swampBorderLeft.js";
import { SwampBorderRight } from "./swampBorderRight.js";
import { SwampBorderTop } from "./swampBorderTop.js";
import { SwampBorderBottom } from "./swampBorderBottom.js";
import { BlueBush } from "./bluebush.js"
import { SwampRose } from "./swampRose.js"
import { SwampDoor } from "./door.js"
import { SwampBackground } from "./background.js";


export class MoerasScene extends Scene {

    name

    constructor() {
        super()

        this.name = "moeras"
    }



    onActivate(ctx) {
        this.clear();

        const swampbg = new SwampBackground({ pos: new Vector(0, 0) });
        this.add(swampbg)

        this.obstaclePositions = [];

        this.positionObstacle(BlueBush, 7, this.obstaclePositions)


        let capybara = new Capybara()
        this.add(capybara)

        this.positionObstacle(SwampRose, 1, this.obstaclePositions)

        let swampDoor = new SwampDoor();
        this.add(swampDoor)

        const player = new Player();
        this.pos = new Vector(300, 60);
        this.width = new Vector(30, 0)
        this.height = new Vector(30, 0)

        this.add(player)

        const playerUI = new UI(player)
        this.add(playerUI)


        const minX = 0;
        const maxX = 1240;
        const minY = 0;
        const maxY = 920;

        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(minX, minY, maxX, maxY));
        this.camera.zoom = 1.35;

        let swampBorderLeft = new SwampBorderLeft();
        this.add(swampBorderLeft)

        let swampBorderRight = new SwampBorderRight();
        this.add(swampBorderRight)

        let swampBorderTop = new SwampBorderTop();
        this.add(swampBorderTop)

        let swampBorderBottom = new SwampBorderBottom();
        this.add(swampBorderBottom)

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
            const x = margin + Math.random() * (width - 2 * margin)
            const y = margin + Math.random() * (height - 2 * margin)
            if (isFarEnough(x, y)) {
                let obstacle = new ObstacleClass()
                obstacle.pos = new Vector(x, y)
                this.add(obstacle)
                positions.push({ x: x, y: y });
                placed++;
            }
        }

    }
}
