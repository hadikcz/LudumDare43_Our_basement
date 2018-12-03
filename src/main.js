/* globals __DEV__ */
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import NearAtlantaScene from './scenes/NearAtlantaScene';
import EnableSoundScene from './scenes/EnableSoundScene';
import GameOverLostScene from './scenes/GameOverLostScene';
import GameOverScene from './scenes/GameOverScene';
import GameConfig from './GameConfig.js';

const config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: GameConfig.GameWindowSettings.width,
    height: GameConfig.GameWindowSettings.height,
    backgroundColor: '#000000',
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    antialias: true,
    scene: [
        BootScene,
        GameScene,
        NearAtlantaScene,
        EnableSoundScene,
        GameOverLostScene,
        GameOverScene
    ]
};

let game = new Phaser.Game(config);
