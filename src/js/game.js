import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { BoundingBox } from "excalibur"
import { PoolScene } from './poolgebied/pool.js'
import { SavanneScene } from './savanne/savanne.js'
import { MoerasScene } from './moeras/swamp.js'
import { TropenScene } from './tropen/tropen.js'
import { MainScene } from './mainscene.js'
import { LabBackground } from './lab/background.js'


export class Game extends Engine {
    player;

    constructor() {
        super({
            width: 1240,
            height: 920,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.player = new Player();
        this.start(ResourceLoader).then(() => this.startGame())

    }

    startGame() {
        console.log("start de game!")
        this.add('game', new MainScene(this.player))
        this.add('pool', new PoolScene())
        this.add('savanne', new SavanneScene())
        this.add('moeras', new MoerasScene())
        this.add('tropen', new TropenScene())
        this.goToScene('game')
    }
}

new Game()