/* global $, VERSION, BUILD_NUMBER */
import $ from 'jquery';
import Phaser from 'phaser';
import GameConfig from "../GameConfig";

export default class NearAtlanta extends Phaser.Scene {
    constructor () {
        super({ key: 'NearAtlanta' });
    }

    create () {
        this.add.text(GameConfig.World.width / 2, GameConfig.World.height / 2, 'Day 432', { fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });
        this.add.text(GameConfig.World.width / 2, (GameConfig.World.height / 2) + 25, 'Atlanta, Georgia', { fontFamily: 'Verdana, Arial', fontSize: 15, color: '#FFFFFF' });

        this.fadeRect = this.add.rectangle(0, 0, 1000, 1000, 0x000000, 1).setAlpha(1);

        this.tweens.add({
            targets: this.fadeRect,
            alpha: 0,
            duration: 800,
            ease: 'Linear'
        });
        setTimeout(() => {
            this.sound.add('gameInit').play();
        }, 1500);
        setTimeout(() => {
            this.tweens.add({
                targets: this.fadeRect,
                alpha: 1,
                duration: 1000,
                ease: 'Linear',
                onComplete: () => {
                    this.scene.start('GameScene');
                }
            });
        }, 5000);
    }
}
