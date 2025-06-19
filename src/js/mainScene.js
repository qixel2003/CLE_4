import { Scene, Actor, Vector, Color, CollisionType, BoundingBox } from "excalibur";
import { Resources } from "./resources.js";
import { Player } from './player.js'
import { UI } from "./UI.js";
import { LabBackground } from "./lab/background.js";
import { Obstacle1 } from "./lab/obstacle1.js";
import { Obstacle2 } from "./lab/obstacle2.js";
import { Obstacle3 } from "./lab/obstacle3.js";
import { Obstacle4 } from "./lab/obstacle4.js";
import { Obstacle5 } from "./lab/obstacle5.js";
import { Obstacle6 } from "./lab/obstacle6.js";
import { SwampDoor } from "./lab/swampDoor.js";
import { TropenDoor } from "./lab/tropenDoor.js";
import { PoolDoor } from "./lab/poolDoor.js";
import { SavanneDoor } from "./lab/savanneDoor.js";
import { LabBorderLeft } from "./lab/labBorderLeft.js";
import { LabBorderRight } from "./lab/labBorderRight.js";
import { LabBorderTop } from "./lab/labBorderTop.js";
import { LabBook } from "./lab/book.js";


export class MainScene extends Scene {
    onActivate(ctx) {
        this.clear();

        const labBackground = new LabBackground();
        this.add(labBackground)

        let obstacle1 = new Obstacle1();
        this.add(obstacle1)

        let obstacle2 = new Obstacle2();
        this.add(obstacle2)

        let obstacle3 = new Obstacle3();
        this.add(obstacle3)

        let obstacle4 = new Obstacle4();
        this.add(obstacle4)

        let obstacle5 = new Obstacle5();
        this.add(obstacle5)

        let obstacle6 = new Obstacle6();
        this.add(obstacle6)

        let swampDoor = new SwampDoor();
        this.add(swampDoor)

        let savanneDoor = new SavanneDoor();
        this.add(savanneDoor)

        let poolDoor = new PoolDoor();
        this.add(poolDoor)

        let tropenDoor = new TropenDoor();
        this.add(tropenDoor)

        let labBorderLeft = new LabBorderLeft();
        this.add(labBorderLeft)

        let labBorderRight = new LabBorderRight();
        this.add(labBorderRight)

        let labBorderTop = new LabBorderTop();
        this.add(labBorderTop)

        let labBook = new LabBook();
        this.add(labBook)

        this.createPlayer();
    }

    createPlayer() {
        const player = new Player()
        this.add(player)
        const minX = 0;
        const maxX = 1240;
        const minY = 0;
        const maxY = 920;

        this.camera.strategy.lockToActor(player);
        this.camera.strategy.limitCameraBounds(new BoundingBox(minX, minY, maxX, maxY));
        this.camera.zoom = 1.35;
        console.log(sessionStorage.getItem("flower"))
        console.log("spawn2")
        console.log("spawn");
       
        const playerUI = new UI(player)
        this.add(playerUI)

      
    }

}