// startscene.js
import { Scene, Label, Color, Font, FontUnit, Vector, Keys } from "excalibur"

export class StartScene extends Scene {
    readyForEnter = false;

    onInitialize(engine) {
        this.engine = engine;

        this.backgroundColor = Color.Black;
        const customFont = new Font({
            unit: FontUnit.Px,
            size: 60,
            color: Color.White,
            family: "VT323"
        });

        const nameText = "Code-X: Outbreak ZomBEASTs";
        const fullText = "Je bent een dokter die een infectie moet stoppen\nen geïnfecteerde dieren moet genezen.\n\nDit doe je door geïnfecteerde dieren te verslaan\nen planten te verzamelen om een medicijn te maken.\n\nJe start in een laboratorium,\nde kamers leiden naar andere gebieden.\n\nJe vangt de dieren op verschillende manieren:\nspringen, gooien, lokken.\n\nJe verliest een leven wanneer je iets verkeerd vangt.\n\nAls je dood bent verlies je progressie in de kamer\nen moet je vanaf het begin beginnen.\n\nGa naar het boek voor meer informatie.";

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
                    text: "Druk op ENTER om door te gaan",
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
            }
        };
        typeName();
    }

    onPreUpdate(engine, delta) {
        console.log("Update... klaar voor enter?", this.readyForEnter);
        if (this.readyForEnter && engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene('game');
        }
    }
}
