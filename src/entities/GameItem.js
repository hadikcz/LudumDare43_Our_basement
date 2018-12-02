import GameConfig from "../GameConfig";

export default class GameItem extends Phaser.GameObjects.Image {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} key
     * @param {object} config
     */
    constructor (scene, x, y, key, config) {
        super(scene, x, y, 'all', key);

        this.scene.add.existing(this);
        this.setOrigin(0.5, 1);

        /**
         * @type {string}
         */
        this.name = config.name ? config.name : '';

        /**
         * @type {string}
         */
        this.actionName = config.actionName ? config.actionName : 'invalid action';

        /**
         * @type {boolean}
         */
        this.isPickable = config.isPickable ? config.isPickable : false;

        this.canTakePiece = config.canTakePiece ? config.canTakePiece : false;
    }

    canBurnUp () {
        return false;
    }
}
