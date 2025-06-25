import { Scene, Label, Color, Font, FontUnit, Vector, Keys, Buttons } from "excalibur"

export class StartScene extends Scene {
    readyForEnter = false;
    skipRequested = false;

    nameLabel;
    infoLabel;
    pressLabel;
    skipLabel;
    nameTimeoutId;
    textTimeoutId;


    onInitialize(engine) {
        this.engine = engine;
        this.skipRequested = false;


        this.nameLabel = new Label({
            text: "",
            pos: engine.screen.center.add(new Vector(0, -350)),
            font: new Font({
                unit: FontUnit.Px,
                size: 60,
                color: Color.White,
                family: "VT323"
            }),
        });
        this.nameLabel.graphics.anchor = new Vector(0.5, 0.5);
        this.add(this.nameLabel);


        this.infoLabel = new Label({
            text: "",
            pos: engine.screen.center,
            font: new Font({
                unit: FontUnit.Px,
                size: 30,
                color: Color.White,
                family: "Arial"
            }),
        });
        this.infoLabel.graphics.anchor = new Vector(0.5, 0.5);
        this.add(this.infoLabel);

        this.backgroundColor = Color.Black;
        const customFont = new Font({
            unit: FontUnit.Px,
            size: 60,
            color: Color.White,
            family: "VT323"
        });


        this.skipLabel = new Label({
            text: "Sla over",
            pos: engine.screen.center.add(new Vector(0, 400)),
            font: new Font({
                unit: FontUnit.Px,
                size: 24,
                color: Color.Gray,
                family: "Arial"
            })
        });
        this.skipLabel.graphics.anchor = new Vector(0.5, 0.5);
        this.add(this.skipLabel);

        // Maak de knop klikbaar
        this.skipLabel.on('pointerup', () => {
            this.skipTyping();
        });

        // Keyboard support (optioneel)
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Keys.Space || evt.key === Keys.S) {
                this.skipTyping();
            }
        });

        const nameText = "Code-X: Outbreak ZomBEASTs";
        const fullText = "Je bent een dokter die een infectie moet stoppen\nen geïnfecteerde dieren moet genezen.\n\nDit doe je door geïnfecteerde dieren te verslaan\nen planten te verzamelen om een medicijn te maken.\n\nJe start in een laboratorium,\nde kamers leiden naar andere gebieden.\n\nJe vangt de dieren op verschillende manieren:\nspringen, gooien, lokken.\n\nJe verliest een leven wanneer je iets verkeerd vangt.\n\nAls je dood bent verlies je progressie in de kamer\nen moet je vanaf het begin beginnen.\n\nGa naar het boek voor meer informatie.";

        // const nameLabel = new Label({
        //     text: "",
        //     pos: engine.screen.center.add(new Vector(0, -350)),
        //     font: customFont,
        // });
        // nameLabel.graphics.anchor = new Vector(0.5, 0.5);
        // this.add(nameLabel);

        // const label = new Label({
        //     text: "",
        //     pos: engine.screen.center,
        //     font: new Font({
        //         unit: FontUnit.Px,
        //         size: 30,
        //         color: Color.White,
        //         family: "Arial"
        //     }),
        // });
        // label.graphics.anchor = new Vector(0.5, 0.5);
        // this.add(label);

        let nameIndex = 0;
        const interval = 80;

        const typeName = () => {
            if (nameIndex < nameText.length) {
                // nameLabel.text += nameText[nameIndex++];
                this.nameLabel.text += nameText[nameIndex++];
                this.nameTimeoutId = setTimeout(typeName, interval);

                // setTimeout(typeName, interval);
            } else {
                typeText();
            }
        };

        let textIndex = 0;
        let currentText = "";

        // const typeText = () => {
        //     if (textIndex < fullText.length) {
        //         // currentText += fullText[textIndex++];
        //         this.infoLabel.text = currentText;

        //         label.text = currentText;
        //         setTimeout(typeText, interval);
        //     } else {
        const typeText = () => {
            if (textIndex < fullText.length) {
                currentText += fullText[textIndex++]; // <- DEZE regel was weg
                this.infoLabel.text = currentText;
                // setTimeout(typeText, interval);
                this.textTimeoutId = setTimeout(typeText, interval);

            } else {
                // klaar met typen            
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

    skipTyping() {
        if (this.skipRequested) return;
        this.skipRequested = true;

        this.readyForEnter = true;


        const nameText = "Code-X: Outbreak ZomBEASTs";
        const fullText = "Je bent een dokter die een infectie moet stoppen\nen geïnfecteerde dieren moet genezen.\n\nDit doe je door geïnfecteerde dieren te verslaan\nen planten te verzamelen om een medicijn te maken.\n\nJe start in een laboratorium,\nde kamers leiden naar andere gebieden.\n\nJe vangt de dieren op verschillende manieren:\nspringen, gooien, lokken.\n\nJe verliest een leven wanneer je iets verkeerd vangt.\n\nAls je dood bent verlies je progressie in de kamer\nen moet je vanaf het begin beginnen.\n\nGa naar het boek voor meer informatie.";

        this.nameLabel.text = nameText;
        this.infoLabel.text = fullText;

        this.pressLabel = new Label({
            text: "Druk op ENTER om door te gaan",
            pos: this.engine.screen.center.add(new Vector(0, 325)),
            font: new Font({
                unit: FontUnit.Px,
                size: 24,
                color: Color.White,
                family: "Arial"
            }),
        });
        this.pressLabel.graphics.anchor = new Vector(0.5, 0.5);
        this.add(this.pressLabel);
        clearTimeout(this.nameTimeoutId);
        clearTimeout(this.textTimeoutId);

        setInterval(() => {
            this.pressLabel.graphics.opacity = this.pressLabel.graphics.opacity === 1 ? 0.4 : 1;
        }, 1000);
    }


    // skipTyping() {
    //     if (this.skipRequested) return;
    //     this.skipRequested = true;

    //     this.readyForEnter = true;

    //     const nameText = "Code-X: Outbreak ZomBEASTs";
    //     const fullText = "Je bent een dokter die een infectie moet stoppen\nen geïnfecteerde dieren moet genezen.\n\nDit doe je door geïnfecteerde dieren te verslaan\nen planten te verzamelen om een medicijn te maken.\n\nJe start in een laboratorium,\nde kamers leiden naar andere gebieden.\n\nJe vangt de dieren op verschillende manieren:\nspringen, gooien, lokken.\n\nJe verliest een leven wanneer je iets verkeerd vangt.\n\nAls je dood bent verlies je progressie in de kamer\nen moet je vanaf het begin beginnen.\n\nGa naar het boek voor meer informatie.";

    //     const nameLabel = this.children.find(child =>
    //         child instanceof Label && child.font.size === 60
    //     );
    //     const label = this.children.find(child =>
    //         child instanceof Label && child.font.size === 30
    //     );

    //     if (nameLabel) nameLabel.text = nameText;
    //     if (label) label.text = fullText;

    //     this.pressLabel = new Label({
    //         text: "Druk op ENTER om door te gaan",
    //         pos: this.engine.screen.center.add(new Vector(0, 325)),
    //         font: new Font({
    //             unit: FontUnit.Px,
    //             size: 24,
    //             color: Color.White,
    //             family: "Arial"
    //         }),
    //     });
    //     this.pressLabel.graphics.anchor = new Vector(0.5, 0.5);
    //     this.add(this.pressLabel);

    //     setInterval(() => {
    //         this.pressLabel.graphics.opacity = this.pressLabel.graphics.opacity === 1 ? 0.4 : 1;
    //     }, 1000);
    // }

    // skipTyping(engine) {
    //     if (this.skipRequested) return;
    //     this.skipRequested = true;
    //     engine.goToScene('game');

    // }

    onPreUpdate(engine, delta) {
        const gamepad = engine.input.gamepads.at(0);

        if (this.readyForEnter && (engine.input.keyboard.wasPressed(Keys.Enter) || gamepad.isButtonPressed(Buttons.Face3))) {
            engine.goToScene('game');
        }
        if (gamepad && gamepad.isButtonPressed(Buttons.Face2)) {
            this.skipTyping();
        }

    }
}
