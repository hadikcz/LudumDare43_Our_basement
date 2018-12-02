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
        this.spriteKey = key;

        /**
         * @type {number[]}
         */
        this.sprites = config.sprites;

        /**
         * @type {string}
         */
        this.name = config.name ? config.name : '';

        /**
         * @type {string}
         */
        this.actionName = config.actionName ? config.actionName : 'invalid action';

        this.emptyActionName = config.emptyActionName ? config.emptyActionName : 'Empty';

        /**
         * @type {boolean}
         */
        this.isPickable = config.isPickable ? config.isPickable : false;

        /**
         * @type {boolean}
         */
        this._canTakePiece = config.canTakePiece ? config.canTakePiece : false;

        /**
         * @type {number}
         */
        this._pieces = config.pieces ? config.pieces : 0;
        /**
         * @type {number}
         */
        this._totalPieces = config.pieces ? config.pieces : 0;

        /**
         * @type {string}
         */
        this.generatePieceName = config.generatePieceName ? config.generatePieceName : false;
    }

    /**
     * @return {boolean}
     */
    canBurnUp () {
        return false;
    }

    /**
     * @return {boolean}
     */
    canTakePiece () {
        return this._pieces > 0;
    }

    /**
     * @return {boolean}
     */
    takePiece () {
        if (this.canTakePiece()) {
            this._pieces--;
            return true;
        }
        return false;
    }
}
