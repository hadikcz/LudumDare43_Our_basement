import GameConfig from "../GameConfig";

export default class DayNightSystem {

    /**
     * @param {GameScene} scene
     */
    constructor(scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {number}
         * @private
         */
        this._currentTime = Phaser.Math.RND.integerInRange(14, 16);

        this.scene.time.addEvent({
            delay: 500,
            loop: true,
            callbackScope: this,
            callback: this._update
        });

        /**
         * @type {number}
         */
        this.day = 431;

        /**
         * @type {Phaser.Sound.BaseSound}
         */
        this.nightAmbient = this.scene.sound.add('nightAmbient');

        /**
         * @type {Phaser.Sound.BaseSound}
         */
        this.sunsetSound = this.scene.sound.add('sunset');

        /**
         * @type {Phaser.Sound.BaseSound}
         */
        this.sunriseSound = this.scene.sound.add('sunrise');
    }

    /**
     * @return {number}
     */
    getTime () {
        return this._currentTime;
    }

    isDay () {
        return this._currentTime > GameConfig.DayNight.NightEnd && this._currentTime < GameConfig.DayNight.NightStart;
    }

    isNight () {
        return !this.isDay();
    }

    /**
     * @private
     */
    _update () {
        this._currentTime += 0.1;
        this._currentTime = parseFloat(this._currentTime.toFixed(1));
        if (this._currentTime > 24) {
            this._currentTime = 0;
            this.day++;
            this.scene.events.emit('changeDay', this.day);
        }

        if (this._currentTime === GameConfig.DayNight.SunriseStartTime) {
            this.scene.events.emit('startSunrise');
            this.nightAmbient.stop();
        }

        if (this._currentTime === 4.6) {
            this.sunriseSound.play();
        }

        if (this._currentTime === GameConfig.DayNight.SunsetStartTime) {
            this.scene.events.emit('startSunset');
            this.nightAmbient.play();
            this.sunsetSound.play();
        }
    }
}
