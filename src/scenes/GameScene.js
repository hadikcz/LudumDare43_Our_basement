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
import DayNightSystem from "../core/DayNightSystem";

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

        this.character = new Character(this, 91, GameConfig.World.firstLevelY, 'man1');
        this.currentCharacter = this.character;

        this.controller = new Controller(this, this.character);
        // draw object
        this.dragTarget = this.gameEnvironment.library;
        this.physics.world.enable(this.dragTarget);
        this.input.setDraggable(this.dragTarget.setInteractive());
        this.input.on('dragstart', function (pointer, obj) {
            obj.body.moves = false;
        });

        this.input.on('drag', function (pointer, obj, dragX, dragY) {
            obj.setPosition(dragX, dragY);
        });

        this.input.on('dragend', function (pointer, obj) {
            obj.body.moves = true;
        });

        this._initDebugUI();
    }

    update () {
        this.controller.update();
        this.gameEnvironment.update();
    }

    _initDebugUI () {
        this.debugGui = new dat.GUI();

        var f1 = this.debugGui.addFolder('Pointer position');
        f1.add(this.input.activePointer, 'worldX').listen();
        f1.add(this.input.activePointer, 'worldY').listen();
        f1.open();

        var f11 = this.debugGui.addFolder('fire');
        f11.add(this.gameEnvironment._boiler, '_isFiring').listen();
        f11.add(this.gameEnvironment._boiler, '_fuel').listen();
        f11.add(this.gameEnvironment._boiler.boilerLoopSound, 'volume').listen();
        f11.open();

        var f12 = this.debugGui.addFolder('Temperature');
        f12.add(this.temperatureSystem, '_temperature').listen();
        f12.add(this.dayNightSystem, '_currentTime').listen();
        f12.open();

        var f13 = this.debugGui.addFolder('Player health');
        f13.add(this.character, '_health').listen();
        f13.open();

        if (this.dragTarget !== undefined) {
            var f2 = this.debugGui.addFolder('Selcted');
            f2.add(this.dragTarget, 'x').step(1).listen();
            f2.add(this.dragTarget, 'y').step(1).listen();
            f2.open();
        }
    }
}
