import GameScene from '../scenes/GameScene.js';
import GameItem from './GameItem';
import Phaser from "phaser";

export default class Boiler extends GameItem {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor (scene, x, y) {
        super(scene, x, y, 'furniture/boiler', { name: 'steam boiler', actionName: 'Add fuel to the' });

        this.scene.add.existing(this);
        /**
         * @type {BoilerLight}
         * @private1
         */
        this._light = scene.lightSystem.boilerLight;

        this.lightSystem = scene.lightSystem;

        /**
         * @type {number}
         * @private
         */
        this._fuel = 25;

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

        this.scene.time.addEvent({
            delay: 3000,
            loop: true,
            callbackScope: this,
            callback: this._boilerTick
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

        // check near item
        let nearestFuel = this.scene.gameEnvironment.findNearestFuel(this);
        if (nearestFuel) {
            this._fuel += nearestFuel.fuel;
            this._boilerTick(true);
            console.log('Burn ' + nearestFuel.name + ' with fuel '+ nearestFuel.fuel);
            nearestFuel.destroy(); // in object create custom destroy method for clean self form that array. or use group
        }
    }

    _boilerTick (skipTake = false) {
        if (this._fuel <= 0) {
            this._fuel = 0;
            this.stopFire();
        } else if (!skipTake) {
            this._fuel -= 1;
        }

        if (this._fuel > 0 && !this._isFiring) {
            this.startFire();
        }
    }

    startFire () {
        this._isFiring = true;
    }

    stopFire () {
        this._isFiring = false;
    }
    //
    // toggleFire () {
    //     this._isFiring = !this._isFiring;
    // }
}
