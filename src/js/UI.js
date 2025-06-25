import '../css/style.css';
import { ScreenElement, Vector, Sprite, ImageSource, Actor, } from 'excalibur';
import { Resources } from './resources';


// Load heart images
const heartFullImage = new ImageSource('images/hartred.png');
const heartEmptyImage = new ImageSource('images/hartgrey.png');

// //animal portrait discover

// // const monkeyDiscover = Resources.Monkeydiscover

//flower portrait discover
// const monkeyDiscover = Resources.Monkeydiscover

export class UI extends ScreenElement {
    constructor(player) {
        super({ anchor: new Vector(0, 0) }); // anchor top-left
        this.player = player;
        this.hearts = [];

        this.discoverySprites = [
            {
                name: "capybara",
                spriteOff: Resources.Capyundiscover.toSprite(),
                spriteOn: Resources.Capydiscover.toSprite()
            },


            {
                name: "monkey",
                spriteOff: Resources.Monkeyundiscover.toSprite(),
                spriteOn: Resources.MonkeyDiscover.toSprite()
            },

            {
                name: "penguin",
                spriteOff: Resources.Penguundiscover.toSprite(),
                spriteOn: Resources.PenguDiscover.toSprite()
            },


            {
                name: "orchid",
                spriteOff: Resources.Orchidundiscover.toSprite(),
                spriteOn: Resources.Orchiddiscover.toSprite()
            },

            {
                name: "swamprose",
                spriteOff: Resources.Swamproseundiscover.toSprite(),
                spriteOn: Resources.Swamprosediscover.toSprite()
            },

            {
                name: "purplesaks",
                spriteOff: Resources.Purplesaksundiscover.toSprite(),
                spriteOn: Resources.Purplesaksdiscover.toSprite()
            },
        ]


    }

    async onInitialize(engine) {
        // Load the heart images
        await Promise.all([
            heartFullImage.load(),
            heartEmptyImage.load(),


        ]);

        // Scale the sprites down (e.g., 50%)
        this.heartFull = heartFullImage.toSprite();
        this.heartFull.scale.setTo(0.15, 0.15);

        this.heartEmpty = heartEmptyImage.toSprite();
        this.heartEmpty.scale.setTo(0.15, 0.15);

        this.updateHearts(); // Initial render



    }

    onPreUpdate() {
        this.updateHearts();
        this.showAnimalPortraits()
    }

    updateProgress() {
        // toon huidige heart / discovery status
        this.removeAllChildren()
        // this.updateHearts();
    }

    updateHearts() {
        // Remove all old hearts
        this.children.forEach(child => this.removeChild(child));
        this.hearts = [];

        const startHealth = this.player.startHealth;
        const currentHealth = this.player.health;

        for (let i = 0; i < startHealth; i++) {
            const isFull = i < currentHealth;
            const heart = new Actor({
                pos: new Vector(10 + i * 70, 10), // closer spacing for smaller hearts
                width: 16,
                height: 16,
                anchor: new Vector(0, 0)
            });
            heart.graphics.use(isFull ? this.heartFull : this.heartEmpty);
            heart.z = 10;
            this.addChild(heart);
            this.hearts.push(heart);
        }
    }

    showAnimalPortraits(engine) {
        // get the player progress from the main gameMore actions

        let progress = this.scene.engine.playerProgress
        // console.log(this.engine.playerProgress)
        // console.log(`ui shows player progress`)
        // console.log(progress)
        if (Array.isArray(progress)) {
            for (let i = 0; i < progress.length; i++) {
                const discovery = new Actor({
                    pos: new Vector(50 + i * 70, 90),
                    anchor: new Vector(0, 0)
                })
                discovery.graphics.use(progress[i] === true ? this.discoverySprites[i].spriteOn : this.discoverySprites[i].spriteOff);
                discovery.z = 10;
                this.addChild(discovery);
            }
        } else {
            console.warn('playerProgress is not an array:', progress);
        }
    }
}

