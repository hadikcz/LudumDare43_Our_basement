/* global $, VERSION, BUILD_NUMBER */
import $ from 'jquery';
import Phaser from 'phaser';
import GameConfig from "../GameConfig";

export default class GameOverLostScene extends Phaser.Scene {
    constructor () {
        super({ key: 'GameOverLostScene' });
    }

    create () {
        if (window.charactersCount === undefined) {
            window.charactersCount = 1;
        }
        if (window.day === undefined) {
            window.day = 431;
        }
        let textMain = this.add.text(300, 300, 'You die', { fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });

        let text = '';
        if (window.charactersCount === 1) {
            text = 'alone, in cold';
        } else if (window.charactersCount === 2) {
            text = 'with small part of your family';
        } else {
            text = 'with whole family';
        }

        textMain.setText([
            'You die, ',
            text,
            'after ' + window.day + ' days'
        ]);

        // Experiment 749 is terminated after X days, you can now return to your real family subject 31.
        // this.add.text(GameConfig.World.width / 2, (GameConfig.World.height / 2) + 25, 'Atlanta, Georgia', { fontFamily: 'Verdana, Arial', fontSize: 15, color: '#FFFFFF' });

        this.fadeRect = this.add.rectangle(0, 0, 1000, 1000, 0x000000, 1).setAlpha(1);

        this.tweens.add({
            targets: this.fadeRect,
            alpha: 0,
            duration: 800,
            ease: 'Linear'
        });
        // setTimeout(() => {
        //     this.sound.add('gameInit').play();
        // }, 1500);
        // setTimeout(() => {
        //     this.tweens.add({
        //         targets: this.fadeRect,
        //         alpha: 1,
        //         duration: 1000,
        //         ease: 'Linear',
        //         onComplete: () => {
        //             this.scene.start('GameScene');
        //         }
        //     });
        // }, 5000);
    }
}
