import GameScene from '../scenes/GameScene.js';

export default class Boiler extends Phaser.GameObjects.Sprite {

    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor (scene, x, y) {
        super(scene, x, y, 'all', 'furniture/boiler');

        this.scene.add.existing(this);
        /**
         * @type {BoilerLight}
         * @private
         */
        this._light = scene.lightSystem.boilerLight;

        this._boilerLightTween = this.scene.tweens.add({
            targets: this._light,
            alpha: 0.50,
            duration: 1000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            delay: 0,
            repeat: Infinity
        });
    }

    update () {
    }
}
