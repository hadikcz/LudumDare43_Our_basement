/* global $, VERSION, BUILD_NUMBER */
import $ from 'jquery';
import Phaser from 'phaser';
import GameConfig from "../GameConfig";

export default class GameOverScene extends Phaser.Scene {
    constructor () {
        super({ key: 'GameOverScene' });
    }

    create () {

        this.fadeRect = this.add.rectangle(0, 0, 2000, 2000, 0xAA0000, 1).setAlpha(1);
        let text = this.add.text(150, 300, '', { fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });
        text.setText([
            'Experiment 749 is terminated, you can now',
            'return to your real family subject 31.'
        ]);

        // Experiment 749 is terminated after X days, you can now return to your real family subject 31.
        // this.add.text(GameConfig.World.width / 2, (GameConfig.World.height / 2) + 25, 'Atlanta, Georgia', { fontFamily: 'Verdana, Arial', fontSize: 15, color: '#FFFFFF' });

        this.fadeRect = this.add.rectangle(0, 0, 2000, 2000, 0xAA0000, 1).setAlpha(1);
        this.tweens.add({
            targets: this.fadeRect,
            alpha: 0,
            duration: 800,
            ease: 'Linear'
        });
    }
}
