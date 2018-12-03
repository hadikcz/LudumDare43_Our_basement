/* eslint-disable no-trailing-spaces */
/* global __DEV__ */
import * as dat from 'dat.gui';
import Phaser from 'phaser';
import Character from '../entities/Character';
import Controller from '../Controller';
import EffectManager from './../effects/EffectManager';
import GameConfig from './../GameConfig';
import GameEnvironment from '../core/GameEnvironment';
import LightSystem from './../core/lights/LightSystem';
import UI from './../ui/UI';
import TemperatureSystem from './../core/TemperatureSystem';
import DayNightSystem from '../core/DayNightSystem';
import CharacterManager from '../core/CharacterManager';

export default class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: 'GameScene' });
        /**
         * @type {EffectManager}
         */
        this.effectManager = null;

        /**
         * @type {UI}
         */
        this.ui = null;


        this.gameOver = false;
    }

    create () {
        this.physics.world.setBounds(0, 0, GameConfig.World.width, GameConfig.World.height);
        this.effectManager = new EffectManager(this);
        this.cameras.main.setOrigin(0, 0);
        this.cameras.main.startFollow({ x: 0, y: 0 });
        this.cameras.main.setZoom(GameConfig.GameWindowSettings.zoom);

        this.lightSystem = new LightSystem(this);

        let bg = this.add.image(1, 1, 'bg');
        bg.setOrigin(0, 0);

        this.gameEnvironment = new GameEnvironment(this);

        this.dayNightSystem = new DayNightSystem(this);
        this.temperatureSystem = new TemperatureSystem(this, this.dayNightSystem);

        this.controller = new Controller(this);

        this.character = null;
        this.characterManager = new CharacterManager(this, this.character);

        // draw object
        // this.dragTarget = this.gameEnvironment.furniture;
        // this.physics.world.enable(this.dragTarget);
        // this.input.setDraggable(this.dragTarget.setInteractive());
        // this.input.on('dragstart', function (pointer, obj) {
        //     obj.body.moves = false;
        // });
        //
        // this.input.on('drag', function (pointer, obj, dragX, dragY) {
        //     obj.setPosition(dragX, dragY);
        // });
        //
        // this.input.on('dragend', function (pointer, obj) {
        //     obj.body.moves = true;
        // });

        // this._initDebugUI();

        this.ui = new UI(this);

        this.fadeRect = this.add.rectangle(0, 0, 1000, 1000, 0x000000, 1).setAlpha(1).setDepth(99999);
        this.tweens.add({
            targets: this.fadeRect,
            alpha: 0,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                this.fadeRect.destroy();
            }
        });

        // this._startGameOver();
    }

    update () {
        this.controller.update();
        this.gameEnvironment.update();
    }

    // _initDebugUI () {
    //     this.debugGui = new dat.GUI();
    //
    //     var f1 = this.debugGui.addFolder('Pointer position');
    //     f1.add(this.input.activePointer, 'worldX').listen();
    //     f1.add(this.input.activePointer, 'worldY').listen();
    //     f1.open();
    //
    //     var f11 = this.debugGui.addFolder('fire');
    //     f11.add(this.gameEnvironment._boiler, '_isFiring').listen();
    //     f11.add(this.gameEnvironment._boiler, '_fuel').listen();
    //     f11.add(this.gameEnvironment._boiler.boilerLoopSound, 'volume').listen();
    //     f11.open();
    //
    //     var f12 = this.debugGui.addFolder('Temperature');
    //     f12.add(this.temperatureSystem, '_temperature').listen();
    //     f12.add(this.dayNightSystem, '_currentTime').listen();
    //     f12.open();
    //
    //     var f13 = this.debugGui.addFolder('Player health');
    //     f13.add(this.characterManager.character, '_health').listen();
    //     f13.open();
    //
    //     if (this.dragTarget !== undefined) {
    //         var f2 = this.debugGui.addFolder('Selcted');
    //         f2.add(this.dragTarget, 'x').step(1).listen();
    //         f2.add(this.dragTarget, 'y').step(1).listen();
    //         f2.open();
    //     }
    // }

    _startGameOver () {
        let circle = this.add.circle(168, 20, 1, 0xAA0000, 0.1);
        circle.setDepth(99999);
        this.sound.add('gameOver').play();
        setTimeout(() => {
            this.tweens.add({
                targets: circle,
                radius: 400,
                fillAlpha: 1,
                duration: 14000,
                ease: 'Sine.easeIn',
                onComplete: () => {
                    this.gameOver = true;
                    this.gameEnvironment._boiler._fuel = 0;
                    this.gameEnvironment._boiler.stop();
                    this.scene.stop('GameScene');
                    this.scene.start('GameOverScene');
                }
            });
        }, 8000);
    }
}
