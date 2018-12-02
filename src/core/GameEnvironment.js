import GameScene from '../scenes/GameScene.js';
import Boiler from './../entities/Boiler';
import GameConfig from '../GameConfig';

export default class GameEnvironment {
    /**
     * @param {GameScene} scene
     */
    constructor (scene) {
        /**
         * @type {GameScene}
         */
        this.scene = scene;

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._walls = this.scene.add.group();

        this.scene.add.image(1, 1, 'surface').setOrigin(0, 0);
        this.nightSurface = this.scene.add.sprite(1, 1, 'nightSurface').setOrigin(0, 0);
        this.scene.add.image(1, 78, 'spaceBetweenSurfaceAndBasement').setOrigin(0, 0).setDepth(GameConfig.DepthLayers.UpOnLights);

        /**
         * @type {Boiler}
         * @private
         */
        this._boiler = new Boiler(this.scene, 286, 137);

        this._createColliders();

        this._createFurniture();
    }

    update () {
        this.scene.physics.collide(this._walls, this.scene.character);
    }

    /**
     * @private
     */
    _createColliders () {
        let rect = this.scene.add.rectangle(0, 110, 16, 250, 0xFF0000, 0);
        this.scene.physics.world.enable(rect);
        rect.body.setImmovable(true);
        rect.body.setSize(16, 250);
        this._walls.add(rect);

        rect = this.scene.add.rectangle(321, 110, 16, 250, 0xFF0000, 0);
        this.scene.physics.world.enable(rect);
        rect.body.setImmovable(true);
        rect.body.setSize(16, 250);
        this._walls.add(rect);
    }

    _createFurniture () {
        this.furniture = this.scene.add.image(0, 0, 'all', 'furniture/table');
        this.scene.add.image(135, 157, 'all', 'furniture/table');
        this.scene.add.image(113, 157, 'all', 'furniture/small_table');
        this.scene.add.image(90, 145, 'all', 'furniture/library');
        this.scene.add.image(65, 140, 'all', 'furniture/hazmat_wardrobe');
    }
}
