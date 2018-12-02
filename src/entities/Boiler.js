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
         * @private1
         */
        this._light = scene.lightSystem.boilerLight;

        this.lightSystem = scene.lightSystem;

        /**
         * @type {boolean}
         * @private
         */
        this._isFiring = true;

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

    preUpdate () {
        if (this._isFiring) {
            this.setFrame('furniture/boiler');
            this._boilerLightTween.resume();
            this._light.setVisible(true);
            this.lightSystem.turnOnAllLights();
        } else {
            this.setFrame('furniture/boiler_cold');
            this._boilerLightTween.pause();
            this._light.setVisible(false);
            this.lightSystem.turnOffAllLights();
        }
    }

    startFire () {
        this._isFiring = true;
    }

    stopFire () {
        this._isFiring = false;
    }
}
