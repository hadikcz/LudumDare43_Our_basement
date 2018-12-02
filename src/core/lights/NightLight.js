import Phaser from 'phaser';
import GameScene from './../../scenes/GameScene';
import GameConfig from "../../GameConfig";

export default class NightLight extends Phaser.GameObjects.Image {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor (scene, x, y) {
        super(scene, x, y, 'night');
        // super(scene, x, y, 319, 77, 0x000000, 1);

        this.scene.add.existing(this);
        this.setOrigin(0, 0);
        this.setBlendMode(Phaser.BlendModes.DIFFERENCE);
        this.setDepth(GameConfig.DepthLayers.Night);
        this.alpha = 0.75;
        // this.setAlpha(0.75);
    }
}
