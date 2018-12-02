import GameScene from './../../scenes/GameScene';
import Light from "./Light";

export default class BoilerLight extends Light {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor (scene, x, y) {
        super(scene, x, y);
    }
}
