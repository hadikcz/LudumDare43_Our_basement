import Furniture from './Furniture';

export default class FurnitureWithPieaces extends Furniture {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} key
     * @param {object} config
     */
    constructor (scene, x, y, key, config) {
        super(scene, x, y, key, config);

        if (config.origin) {
            this.setOrigin(config.origin[0], config.origin[1]);
        }

        this._redraw();
    }

    /**
     * @return {boolean}
     */
    takePiece () {
        if (super.takePiece()) {
            this._redraw();
            return true;
        }
        return false;
    }

    _redraw () {
        if (!this.canTakePiece()) {
            this.setFrame(this.spriteKey + 'Empty');
            return;
        }

        let percent = Math.round((this._pieces / this._totalPieces) * 10);
        let frame = this._totalPieces - this._pieces;
        console.log((this._pieces / this._totalPieces));
        console.log(percent);
        console.log(this._pieces + ' ' + this._totalPieces);
        // console.log(this.sprites);
        console.log(this.spriteKey + this.sprites[frame]);
        this.setFrame(this.spriteKey + this.sprites[frame]);
    }
}
