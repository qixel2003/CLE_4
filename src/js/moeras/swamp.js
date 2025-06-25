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
import { Lilypad } from "./lilypad.js"
import { Grasblue } from "./grasblue.js"
import { Purplerock } from "./purplerock.js"
import { SwampRose } from "./swampRose.js"
import { SwampDoor } from "./door.js"
import { SwampBackground } from "./background.js";
import { SwampBackground1 } from "./swampbg1.js";
import { SwampBackground2 } from "./swampbg2.js";
import { SwampBackground3 } from "./swampbg3.js";
import { SwampBackground4 } from "./swampbg4.js";
import { SwampBackground5 } from "./swampbg5.js";
import { SwampBackground6 } from "./swampbg6.js";
import { SwampBackground7 } from "./swampbg7.js";
import { SwampBackground8 } from "./swampbg8.js";
import { SwampBackground82 } from "./swampbg82.js";
import { SwampBackground83 } from "./swampbg83.js";
import { SwampBackground9 } from "./swampbg9.js";
import { Capyfiona } from "./capyfiona.js"







export class MoerasScene extends Scene {

    name

    constructor() {
        super()
        this.name = "moeras"

    }


    onActivate(ctx) {

        Resources.BackgroundMusicMoeras.loop = true;
        Resources.BackgroundMusicMoeras.play();
        this.clear();



        const swampbg = new SwampBackground({ pos: new Vector(0, 0) });
        this.add(swampbg)

        const swampbg1 = new SwampBackground1({ pos: new Vector(0, 0) });
        this.add(swampbg1)

        const swampbg2 = new SwampBackground2({ pos: new Vector(0, 0) });
        this.add(swampbg2)

        const swampbg3 = new SwampBackground3({ pos: new Vector(0, 0) });
        this.add(swampbg3)

        const swampbg4 = new SwampBackground4({ pos: new Vector(0, 0) });
        this.add(swampbg4)

        const swampbg5 = new SwampBackground5({ pos: new Vector(0, 0) });
        this.add(swampbg5)

        const swampbg6 = new SwampBackground6({ pos: new Vector(0, 0) });
        this.add(swampbg6)

        const swampbg7 = new SwampBackground7({ pos: new Vector(0, 0) });
        this.add(swampbg7)

        const swampbg8 = new SwampBackground8({ pos: new Vector(0, 0) });
        this.add(swampbg8)

        const swampbg82 = new SwampBackground82({ pos: new Vector(0, 0) });
        this.add(swampbg82)

        const swampbg83 = new SwampBackground83({ pos: new Vector(0, 0) });
        this.add(swampbg83)

        const swampbg9 = new SwampBackground9({ pos: new Vector(0, 0) });
        this.add(swampbg9)


        this.swampAreas = this.actors.filter(actor =>
            actor instanceof SwampBackground1 ||
            actor instanceof SwampBackground2 ||
            actor instanceof SwampBackground3 ||
            actor instanceof SwampBackground4 ||
            actor instanceof SwampBackground5 ||
            actor instanceof SwampBackground6 ||
            actor instanceof SwampBackground7 ||
            actor instanceof SwampBackground8 ||
            actor instanceof SwampBackground82 ||
            actor instanceof SwampBackground83 ||
            actor instanceof SwampBackground9
        );


        this.obstaclePositions = [];

        this.positionObstacle(BlueBush, 7, this.obstaclePositions)
        this.positionObstacle(Lilypad, 5, this.obstaclePositions)


        let capybara = new Capybara()
        if (sessionStorage.getItem("moerasanimal") === null) {
            this.add(capybara)
        }


        let capyfiona = new Capyfiona()
        this.add(capyfiona)

        if (sessionStorage.getItem("swamp") === null) {
            this.positionObstacle(SwampRose, 1, this.obstaclePositions)
        }

        let swampDoor = new SwampDoor();
        this.add(swampDoor)

        const player = new Player();
        this.pos = new Vector(300, 60);
        this.width = new Vector(30, 0)
        this.height = new Vector(30, 0)


        this.add(player)

        this.positionObstacle(Grasblue, 8, this.obstaclePositions)
        this.positionObstacle(Purplerock, 4, this.obstaclePositions)

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
    onInitialize() {
        // voorbeeld aanpassen playerprogress
        // 0 = capybara, 1 = monkey, 2 = orchid

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
        Resources.BackgroundMusicMoeras.stop();
    }
}
