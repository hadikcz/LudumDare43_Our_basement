/* global $, VERSION, BUILD_NUMBER */
import $ from 'jquery';
import Phaser from 'phaser';
import GameConfig from "../GameConfig";

export default class EnableSoundScene extends Phaser.Scene {
    constructor () {
        super({ key: 'EnableSoundScene' });
    }

    create () {
        this.text = this.add.text(GameConfig.World.width / 2, GameConfig.World.height / 2, '', { fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });
        this.text.setText([
            'Please enable sound and use headphones',
            'for better mood'
        ]);

        this.fadeRect = this.add.rectangle(0, 0, 1500, 1500, 0x000000, 1).setAlpha(0);
        setTimeout(() => {
            this.tweens.add({
                targets: this.fadeRect,
                alpha: 1,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.scene.start('NearAtlanta');
                }
            });
        }, 5000);
    }
}
