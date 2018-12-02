import GameItem from "./GameItem";
import GameConfig from "../GameConfig";

export default class Furniture extends GameItem {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} key
     * @param {object} config
     */
    constructor (scene, x, y, key, config) {
        super(scene, x, y, key, config);

        this.setDepth(GameConfig.DepthLayers.Furniture);

        /**
         * @type {boolean}
         * @private
         */
        this._isPickedUp = false;

        /**
         * @type {number}
         */
        this.fuel = config.fuel ? config.fuel : 10;
    }

    canBurnUp () {
        return !this._isPickedUp;
    }

    canPickUp () {
        return !this._isPickedUp && this.isPickable;
    }

    canTakePiece () {
        // return thi
    }

    pickUp () {
        this._isPickedUp = true;
        this.setDepth(GameConfig.DepthLayers.PickedFurniture);
        // this.setVisible(false);
    }

    putDown (x, y) {
        this._isPickedUp = false;
        this.setPosition(x, y);
        this.setDepth(GameConfig.DepthLayers.Furniture);
        // this.setVisible(true);
    }

}
