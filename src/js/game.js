import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { BoundingBox } from "excalibur"
import { PoolScene } from './poolgebied/pool.js'
import { MoerasScene } from './moeras/swamp.js'
import { TropenScene } from './tropen/tropen.js'
import { MainScene } from './mainscene.js'
import { StartScene } from './startScene.js'
import { EndScene } from './endScene.js'


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

        // capybara, monkey, orchid discovery More actions
        this.playerProgress = [false, false, false, false, false, false]

        this.start(ResourceLoader).then(() => this.startGame())

    }

    startGame() {


        console.log("start de game!")
        this.add('start', new StartScene());
        this.add('game', new MainScene(this.player))
        this.add('pool', new PoolScene())
        this.add('moeras', new MoerasScene())
        this.add('tropen', new TropenScene())
        this.add('end', new EndScene());
        this.goToScene('game')
        // this.goToScene('start');
    }
}

let test = new Game()
console.log(test.playerProgress)