import Phaser from 'phaser';
import GameScene from './../scenes/GameScene';

export default class Character extends Phaser.GameObjects.Sprite {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} characterId
     */
    constructor (scene, x, y, characterId) {
        let key = Character.getCharacterKey(characterId);
        super(scene, x, y, 'all', key);

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.acceleration = 250;
        this.body.maxVelocity.x = 50;
        this.body.maxVelocity.y = 0;

        this.body.setDragX(250);

        /**
         * @type {number}
         * @private
         */
        this._level = 1;

        /**
         * @type {string}
         */
        this.characterId = characterId;

        /**
         * @type {string}
         * @private
         */
        this._directionFacing = 'right';
    }

    /**
     * @param {string} characterId
     * @return {string}
     */
    static getCharacterKey (characterId) {
        return 'characters/' + characterId + '_right_stay';
    }

    /**
     * @param {number} velocity
     * @param {string} direction
     */
    walk (velocity, direction) {
        this.body.setAccelerationX(velocity);
        if (direction !== undefined) {
            if (this._directionFacing !== direction) {
                this._directionFacing = direction;
                this._redrawFacing();
            }
        }
    }

    _redrawFacing () {
        if (this._directionFacing === 'left') {
            this.setScale(-1, 1);
            this.body.setOffset(8, 0);
        } else if (this._directionFacing === 'right') {
            this.setScale(1, 1);
            this.body.setOffset(0, 0);
        }
    }
}
