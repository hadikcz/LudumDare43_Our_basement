import Boiler from './../entities/Boiler';
import GameConfig from "../GameConfig";

export default class TemperatureSystem {

    /**
     * @param {GameScene} scene
     */
    constructor(scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

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
            this._temperature -= GameConfig.Temperature.TempatureStepDay;
        }

        if (this._temperature < GameConfig.Temperature.LowestDay) {
            this._temperature = GameConfig.Temperature.LowestDay;
        }

        if (this._temperature > GameConfig.Temperature.LimitMax) {
            this._temperature = GameConfig.Temperature.LimitMax;
        }
    }

}
