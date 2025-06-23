import { Actor, CollisionType, Color, Font, Graphic, Label, Rectangle, Buttons, Shape, Vector } from "excalibur";
import { Resources } from "../resources.js";
import { Player } from "../player.js";

export class LabBook extends Actor {
    constructor() {
        super({ width: Resources.Book2.width, height: Resources.Book2.height, collisionType: CollisionType.Passive });

        this.graphics.use(Resources.Book2.toSprite());
        this.scale = new Vector(0.075, 0.075)
        this.collider.set(Shape.Box(900, 1200));
        this.pos = new Vector(600, 460);
        this.pages = [
            "Je bent een dokter die een\ninfectie moet stoppen en\ngeïnfecteerde dieren moet genezen.\n\nDit doe je door geïnfecteerde dieren\nte verslaan en planten te verzamelen\nom een medicijn te maken.\n\nJe start in een laboratorium,\nde kamers leiden naar andere\ngebieden.\n\nJe vangt de dieren op verschillende\nmanieren: springen, gooien, lokken.\n\nJe verliest een leven wanneer je iets\nverkeerd vangt.\n\nAls je “dood” bent verlies je progressie\nin de kamer en moet je vanaf het begin\nbeginnen.",
            "Controls:\n\nDoor op ? te klikken ga je naar voren.\n\nDoor op ? te klikken ga je naar\nachteren.\n\nDoor op ? te klikken ga je naar links.\n\nDoor op ? te klikken ga je naar rechts.",
            "Vangmethodes:\n\nDoor op ? te klikken gooi je een net.\n\nDoor op ? te klikken gooi je een steen.\n\nDoor eerst de plant te pakken kan je\neen dier lokken.\n\nDoor op ? te klikken spring je op een\ndier.",
            "Hints voor de bijpassende\nvangmethodes:\n\nHet dier dat het hoogst springt moet\nmet een net worden gevangen.\n\nHet dier dat agressief is moet je\naanvallen.\n\nHet dier dat ?\n\nOp het dier dat het verst glijdt moet je\nspringen."
        ];
        this.currentPage = 0;
        this.popup = null;
        this._onKeyPress = null;

        this.lastInputTime = {
            dpadLeft: 0,
            dpadRight: 0,
            face4: 0
        };
        this.inputCooldown = 250; // in milliseconds

    }

    onInitialize(engine) {
        this.on("collisionstart", (evt) => {
            if (evt.other.owner instanceof Player) {
                evt.other.owner.isNearBook = true;
            }
        });
        this.on("collisionend", (evt) => {
            if (evt.other.owner instanceof Player) {
                evt.other.owner.isNearBook = false;
            }
        });
    }

    onPreUpdate(engine) {
        if (!this.popup) return;

        const gamepad = engine.input.gamepads.at(0);
        if (!gamepad) return;

        const now = Date.now();

        // D-pad right to go forward
        if (
            gamepad.isButtonPressed(Buttons.DpadRight) &&
            now - this.lastInputTime.dpadRight > this.inputCooldown &&
            this.currentPage < this.pages.length - 1
        ) {
            this.currentPage++;
            this.popup.text = this.pages[this.currentPage];
            this.updateArrows();
            this.lastInputTime.dpadRight = now;
        }

        // D-pad left to go backward
        if (
            gamepad.isButtonPressed(Buttons.DpadLeft) &&
            now - this.lastInputTime.dpadLeft > this.inputCooldown &&
            this.currentPage > 0
        ) {
            this.currentPage--;
            this.popup.text = this.pages[this.currentPage];
            this.updateArrows();
            this.lastInputTime.dpadLeft = now;
        }

        // Face4 to close
        if (
            gamepad.isButtonPressed(Buttons.Face4) &&
            now - this.lastInputTime.face4 > this.inputCooldown
        ) {
            this.closePopup(engine);
            this.lastInputTime.face4 = now;
        }
    }



    showPopup(engine) {
        const popupWidth = 820;
        const popupHeight = 320;
        const centerX = engine.drawWidth / 1.65;
        const centerY = engine.drawHeight / 2;

        // Achtergrond 
        this.popupBg = new Actor({
            pos: new Vector(centerX, centerY),
            width: popupWidth,
            height: popupHeight,
            z: 9998,
            anchor: Vector.Half,
            collisionType: CollisionType.PreventCollision
        });
        this.popupBg.graphics.use(Resources.Book.toSprite());
        this.popupBg.scale = new Vector(0.75, 0.75);
        engine.currentScene.add(this.popupBg);

        // Tekst
        this.popupLeft = new Label({
            text: this.pages[this.currentPage * 2] || "",
            pos: new Vector(centerX - 300, centerY - 190),
            font: new Font({ size: 17, color: Color.Black }),
            z: 9999,
            anchor: Vector.Half
        });
        engine.currentScene.add(this.popupLeft);

        this.popupRight = new Label({
            text: this.pages[this.currentPage * 2 + 1] || "",
            pos: new Vector(centerX + 25, centerY - 190),
            font: new Font({ size: 17, color: Color.Black }),
            z: 9999,
            anchor: Vector.Half
        });
        engine.currentScene.add(this.popupRight);

        // Kruisje 
        const crossSize = 40;
        this.closeBtn = new Label({
            text: "✕",
            pos: new Vector(centerX - popupWidth / 2.2 + crossSize, centerY - popupHeight / 1.1 + crossSize),
            font: new Font({ size: 30, color: Color.Black }),
            z: 10000,
            anchor: Vector.Half
        });
        engine.currentScene.add(this.closeBtn);

        this.closeBtn.on('pointerup', () => {
            this.closePopup(engine);
        });

        const arrowSize = 40;
        const arrowY = centerY + popupHeight / 2 - arrowSize;

        // Linkerpijl
        this.leftArrow = new Label({
            text: "<",
            pos: new Vector(centerX - popupWidth / 2.5 + arrowSize, arrowY + 35),
            font: new Font({ size: arrowSize, color: this.currentPage > 0 ? Color.Black : Color.Gray }),
            z: 10000,
            anchor: Vector.Half
        });
        engine.currentScene.add(this.leftArrow);
        this.leftArrow.on('pointerup', () => {
            if (this.currentPage > 0) {
                this.currentPage--;
                this.popupLeft.text = this.pages[this.currentPage * 2] || "";
                this.popupRight.text = this.pages[this.currentPage * 2 + 1] || "";
                this.updateArrows();
            }
        });

        // Rechterpijl
        this.rightArrow = new Label({
            text: ">",
            pos: new Vector(centerX + popupWidth / 2.65 - arrowSize, arrowY + 35),
            font: new Font({ size: arrowSize, color: this.currentPage < this.pages.length - 1 ? Color.Black : Color.Gray }),
            z: 10000,
            anchor: Vector.Half
        });
        engine.currentScene.add(this.rightArrow);
        this.rightArrow.on('pointerup', () => {
            if (this.currentPage < Math.floor(this.pages.length / 2) - 1) {
                this.currentPage++;
                this.popupLeft.text = this.pages[this.currentPage * 2] || "";
                this.popupRight.text = this.pages[this.currentPage * 2 + 1] || "";
                this.updateArrows();
            }
        });

        this._onKeyPress = (e) => {
            if ((e.key === 'ArrowRight') && this.currentPage < Math.floor(this.pages.length / 2) - 1) {
                this.currentPage++;
                this.popupLeft.text = this.pages[this.currentPage * 2] || "";
                this.popupRight.text = this.pages[this.currentPage * 2 + 1] || "";
                this.updateArrows();
            } else if ((e.key === 'ArrowLeft') && this.currentPage > 0) {
                this.currentPage--;
                this.popupLeft.text = this.pages[this.currentPage * 2] || "";
                this.popupRight.text = this.pages[this.currentPage * 2 + 1] || "";
                this.updateArrows();
            } else if (e.key === 'Escape') {
                this.closePopup(engine);
            }
        };
        engine.input.keyboard.on('press', this._onKeyPress);
    }
    updateArrows() {
        if (this.leftArrow) {
            this.leftArrow.font.color = this.currentPage > 0 ? Color.Black : Color.Gray;
        }
        if (this.rightArrow) {
            this.rightArrow.font.color = this.currentPage < Math.floor(this.pages.length / 2) - 1 ? Color.Black : Color.Gray;
        }
    }
    closePopup(engine) {
        if (this.popup) {
            this.popup.kill();
            this.popup = null;
            this.currentPage = 0;
        }
        if (this.popupBg) {
            this.popupBg.kill();
            this.popupBg = null;
        }
        if (this.closeBtn) {
            this.closeBtn.kill();
            this.closeBtn = null;
        }
        if (this.leftArrow) {
            this.leftArrow.kill();
            this.leftArrow = null;
        }
        if (this.rightArrow) {
            this.rightArrow.kill();
            this.rightArrow = null;
        }

        if (this.popupLeft) {
            this.popupLeft.kill();
            this.popupLeft = null;
        }
        if (this.popupRight) {
            this.popupRight.kill();
            this.popupRight = null;
        }
        engine.input.keyboard.off('press', this._onKeyPress);
    }
}