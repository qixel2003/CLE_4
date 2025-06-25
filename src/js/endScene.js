import { Scene, Label, Color, Font, FontUnit, Vector, Keys, ImageSource, Actor, SpriteSheet, range, Buttons } from "excalibur"
import { Resources } from "./resources";

export class EndScene extends Scene {
    readyForEnter = false;


    onInitialize(engine) {
        this.engine = engine;
        this.lastEnterTime = 0;

        this.backgroundColor = Color.Black;
        const customFont = new Font({
            unit: FontUnit.Px,
            size: 60,
            color: Color.White,
            family: "VT323"
        });

        const nameText = "Code-X: Outbreak ZomBEASTs";
        const fullText = "Gefeliciteerd je heb gewonnen!";

        const nameLabel = new Label({
            text: "",
            pos: engine.screen.center.add(new Vector(0, -350)),
            font: customFont,
        });
        nameLabel.graphics.anchor = new Vector(0.5, 0.5);
        this.add(nameLabel);

        const label = new Label({
            text: "",
            pos: engine.screen.center,
            font: new Font({
                unit: FontUnit.Px,
                size: 30,
                color: Color.White,
                family: "Arial"
            }),
        });
        label.graphics.anchor = new Vector(0.5, 0.5);
        this.add(label);

        let nameIndex = 0;
        const interval = 80;

        const typeName = () => {
            if (nameIndex < nameText.length) {
                nameLabel.text += nameText[nameIndex++];
                setTimeout(typeName, interval);
            } else {
                typeText();
            }
        };

        let textIndex = 0;
        let currentText = "";

        const typeText = () => {
            if (textIndex < fullText.length) {
                currentText += fullText[textIndex++];
                label.text = currentText;
                setTimeout(typeText, interval);
            } else {
                this.readyForEnter = true;
                this.pressLabel = new Label({
                    text: "Druk op ENTER om opnieuw te spelen",
                    pos: engine.screen.center.add(new Vector(0, 325)),
                    font: new Font({
                        unit: FontUnit.Px,
                        size: 24,
                        color: Color.White,
                        family: "Arial"
                    }),
                });
                this.pressLabel.graphics.anchor = new Vector(0.5, 0.5);
                this.add(this.pressLabel);
                setInterval(() => {
                    this.pressLabel.graphics.opacity = this.pressLabel.graphics.opacity === 1 ? 0.4 : 1;
                }, 1000);

                const speed = 300;

                const monkeySheet = SpriteSheet.fromImageSource({
                    image: Resources.MutatedMonkey,
                    grid: { rows: 1, columns: 12, spriteWidth: 50, spriteHeight: 250 }
                });
                const monkeySprite = monkeySheet.sprites[3];

                const monkeyActor = new Actor({
                    pos: new Vector(0, 700),
                    width: 300,
                    height: 300,
                    vel: new Vector(speed, 0)
                });
                monkeyActor.graphics.use(monkeySprite);
                this.add(monkeyActor);

                const capybaraSheet = SpriteSheet.fromImageSource({
                    image: Resources.Capybara,
                    grid: { rows: 1, columns: 12, spriteWidth: 100, spriteHeight: 100 }
                });

                const capybaraSprite = capybaraSheet.sprites[1];

                const capybaraActor = new Actor({
                    pos: new Vector(-200, 600),
                    width: 300,
                    height: 300,
                    vel: new Vector(speed, 0)
                });
                capybaraActor.graphics.use(capybaraSprite);
                this.add(capybaraActor);

                const penguinSheet = SpriteSheet.fromImageSource({
                    image: Resources.Penguin,
                    grid: { rows: 1, columns: 12, spriteWidth: 100, spriteHeight: 250 }
                });

                const penguinSprite = penguinSheet.sprites[1];

                const penguinActor = new Actor({
                    pos: new Vector(-400, 700),
                    width: 300,
                    height: 300,
                    vel: new Vector(speed, 0)
                });
                penguinActor.graphics.use(penguinSprite);
                this.add(penguinActor);
            }
        };

        engine.input.keyboard.on('press', (evt) => {
            const now = Date.now();
            if (
                evt.key === Keys.Enter &&
                this.readyForEnter &&
                now - this.lastEnterTime > 1000
            ) {
                this.lastEnterTime = now;
                sessionStorage.clear();
                window.location.reload();
                // engine.goToScene('start');
            }
        });

        const gamepad = engine.input.gamepads.at(0);

        if (gamepad && gamepad.isButtonPressed(Buttons.Face3) && this.readyForEnter) {
            sessionStorage.clear();
            engine.goToScene('start');
        }

        typeName();
    }
}
