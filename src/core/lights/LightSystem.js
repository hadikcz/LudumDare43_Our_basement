import GameScene from '../../scenes/GameScene';
import Light from './Light';
import BoilerLight from './BoilerLight';
import NightLight from './NightLight';

export default class LightSystem {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {BoilerLight}
         */
        this.boilerLight = new BoilerLight(this.scene, 282, 153);


        // let night = this.scene.add.rectangle(1, 1, 319, 77, 0x000000, 1);
        // night.setOrigin(0, 0);
        // night.setDepth(12);
        /**
         * @type {Light[]}
         * @private
         */
        this._lights = [];

        this._createLights();
    }

    _createLights () {
        // first level
        this._lights.push(new Light(this.scene, 48, 120));
        this._lights.push(new Light(this.scene, 92, 123));
        this._lights.push(new Light(this.scene, 149, 122));
        this._lights.push(new Light(this.scene, 210, 124));

        // second level
        this._lights.push(new Light(this.scene, 39, 180));
        this._lights.push(new Light(this.scene, 97, 179));
        this._lights.push(new Light(this.scene, 183, 179));
        this._lights.push(new Light(this.scene, 264, 176));
        this._lights.push(new Light(this.scene, 307, 175));

    }
}
