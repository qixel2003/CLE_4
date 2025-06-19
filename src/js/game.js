import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { BoundingBox } from "excalibur"
import { PoolScene } from './poolgebied/pool.js'
import { MainScene } from './mainscene.js'
import { SavanneScene } from './savanne/savanne.js'
import { MoerasScene } from './moeras/swamp.js'
import { TropenScene } from './tropen/tropen.js'
import { LabBackground } from './lab/background.js'
// import { LabBorder } from './lab/labBorder.js'

export class Game extends Engine {

    player;
    constructor() {
        super({
            width: 1240,
            height: 920,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
        
    }

    startGame() {
        console.log("start de game!")

        // const background = new LabBackground();
        // this.add(background)
        // this.add('labBorder', new LabBorder())

        this.add('game', new MainScene())
        this.add('pool', new PoolScene())
        this.add('savanne', new SavanneScene())
        this.add('moeras', new MoerasScene())
        this.add('tropen', new TropenScene())
        this.goToScene('game')
        // this.createPlayer()
        // this.camera.strategy.lockToActor(player);
    }

    // createPlayer() {
    //     const player = new Player()
    //     this.add(player)
    //     this.currentScene.add(player)
    //     this.currentScene.camera.strategy.lockToActor(player)
    //     console.log("spawn");
    //     console.log(player);
    // }
}

new Game()