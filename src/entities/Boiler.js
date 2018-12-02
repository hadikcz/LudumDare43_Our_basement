import GameScene from '../scenes/GameScene.js';
import GameItem from './GameItem';
import Phaser from "phaser";
import CameraHelpers from "../helpers/CameraHelpers";
import GameConfig from "../GameConfig";

export default class Boiler extends GameItem {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor (scene, x, y) {
        super(scene, x, y, 'furniture/boiler', {name: 'steam boiler', actionName: 'Add fuel to the'});

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
            delay: 1500,
            loop: true,
            callbackScope: this,
            callback: this._boilerTick
        });

        /**
         * @type {Phaser.Sound.HTML5AudioSound}
         */
        this.boilerLoopSound = this.scene.sound.add('boilerLoop', {loop: true});
        this.boilerLoopSound.play();

        /**
         * @type {Phaser.Sound.HTML5AudioSound}
         */
        this.throwSound = this.scene.sound.add('throw');
    }

    /**
     * @return {boolean}
     */
    isFiring () {
        return this._isFiring;
    }

    preUpdate () {
        if (this._isFiring) {
            this.setFrame('furniture/boiler');
            this._boilerLightTween.resume();
            this._light.setVisible(true);
            this.lightSystem.turnOnAllLights();

            // this.boilerLoopSound.setVolume(CameraHelpers.calcVolume(this.x, this.y, this.scene.character.x, this.scene.character.y, 0.1, 200));
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
            this.throwSound.play();
            nearestFuel.destroy(); // in object create custom destroy method for clean self form that array. or use group
        }
    }

    _boilerTick (skipTake = false) {
        if (this._fuel <= 0) {
            this._fuel = 0;
            this.stopFire();
        } else if (!skipTake) {
            if (this.scene.dayNightSystem.isDay()) {
                this._fuel -= 1;
            } else {
                this._fuel -= 2;
            }
        }

        if (this._fuel > GameConfig.Boiler.maxCapacity) {
            this._fuel = GameConfig.Boiler.maxCapacity;
        }

        if (this._fuel > 0 && !this._isFiring) {
            this.startFire();
        }
        let percent = Math.round((this._fuel / GameConfig.Boiler.maxCapacity) * 100);
        this.scene.events.emit('boilerTick', percent);
    }

    startFire () {
        this._isFiring = true;
        this.boilerLoopSound.play();
    }

    stopFire () {
        this._isFiring = false;
        this.boilerLoopSound.stop();
    }
    //
    // toggleFire () {
    //     this._isFiring = !this._isFiring;
    // }
}
