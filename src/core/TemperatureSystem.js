import Boiler from './../entities/Boiler';
import GameConfig from "../GameConfig";
import DayNightSystem from './DayNightSystem';

export default class TemperatureSystem {

    /**
     * @param {GameScene} scene
     * @param {DayNightSystem} dayNightSystem
     */
    constructor(scene, dayNightSystem) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {DayNightSystem}
         */
        this.dayNightSystem = dayNightSystem;

        /**
         * @type {Boiler}
         */
        this.boiler = this.scene.gameEnvironment._boiler;

        /**
         * @type {number}
         * @private
         */
        this._temperature = Phaser.Math.RND.integerInRange(10, 20);

        this.scene.time.addEvent({
            delay: 50,
            loop: true,
            callbackScope: this,
            callback: this._update50ms
        });
    }

    /**
     * @return {number}
     */
    getTemperature () {
        return this._temperature;
    }

    /**
     * @private
     */
    _update50ms () {
        if (this.boiler.isFiring()) {
            this._temperature += GameConfig.Temperature.TempatureStepDay * 4;
        } else {
            if (this.dayNightSystem.isDay()) {
                this._temperature -= GameConfig.Temperature.TempatureStepDay;
            } else {
                this._temperature -= GameConfig.Temperature.TempatureStepNight;
            }
        }

        if (this.dayNightSystem.isDay()) {
            if (this._temperature < GameConfig.Temperature.LowestDay) {
                this._temperature = GameConfig.Temperature.LowestDay;
            }
        } else {
            if (this._temperature < GameConfig.Temperature.LowestNight) {
                this._temperature = GameConfig.Temperature.LowestNight;
            }
        }

        if (this._temperature > GameConfig.Temperature.LimitMax) {
            this._temperature = GameConfig.Temperature.LimitMax;
        }
        this.scene.events.emit('changedTemperature', this._temperature.toFixed(1));
    }

}
