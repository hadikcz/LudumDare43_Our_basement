export default class Controller {
    /**
     * @param {GameScene} scene
     * @param {Character} targetCharacterToControll
     */
    constructor (scene, targetCharacterToControll) {

        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {Character} targetCharacterToControl
         */
        this._targetCharacterToControl = targetCharacterToControll;

        /**
         * @type {{jump: Phaser.Input.Keyboard.Key, jump2: Phaser.Input.Keyboard.Key, fire: Phaser.Input.Keyboard.Key, left: Phaser.Input.Keyboard.Key, right: Phaser.Input.Keyboard.Key, down: Phaser.Input.Keyboard.Key}}
         */
        this.keys = {
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            up2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            left2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            right2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            down2: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            action: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        };
    }

    update () {
        if (this.keys.up || this.keys.up2) {
            // try walk up to up ladder
        }
        if (this.keys.down || this.keys.down2) {
            // try walk up to down ladder
        }

        if (this.keys.left.isDown || this.keys.left2.isDown) {
            this._targetCharacterToControl.walk(-this._targetCharacterToControl.acceleration, 'left');
        } else if (this.keys.right.isDown || this.keys.right2.isDown) {
            this._targetCharacterToControl.walk(this._targetCharacterToControl.acceleration, 'right');
        } else {
            // this._targetCharacterToControl.body.setVelocity(0, 0);
            this._targetCharacterToControl.walk(0);
        }
    }
}
