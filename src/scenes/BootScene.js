/* global gamee */
import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor () {
        super({ key: 'BootScene', plugins: ['Loader'] });
    }

    preload () {
        window.scene = this;

        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('GameScene');
        }, this);
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('light', 'assets/images/light.png');
        this.load.image('spaceBetweenSurfaceAndBasement', 'assets/images/spaceBetweenSurfaceAndBasement.png');
        this.load.image('surface', 'assets/images/surface.png');
        this.load.image('night', 'assets/images/night.png');
        this.load.image('nightSurface', 'assets/images/nightSurface.png');
        this.load.atlas('all', 'assets/images/all.png', 'assets/images/all.json');
    }
}
