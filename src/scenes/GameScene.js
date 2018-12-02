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
import NightLight from "../core/lights/NightLight";

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

        let bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0);

        this.gameEnvironment = new GameEnvironment(this);

        this.character = new Character(this, 37, GameConfig.World.firstLevelY, 'man1');
        this.currentCharacter = this.character;


        // let light = this.add.image(92, 123, 'light');
        // light.setBlendMode(Phaser.BlendModes.LIGHTEN);
        this.controller = new Controller(this, this.character);

        /**
         * @type {NightLight}
         * @private
         */
        // this._night = new NightLight(this, 1, 1);

        // draw object
        this.dragTarget = this.lightSystem._darkBasement;
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
        f11.open();

        if (this.dragTarget !== undefined) {
            var f2 = this.debugGui.addFolder('Selcted');
            f2.add(this.dragTarget, 'x').step(1).listen();
            f2.add(this.dragTarget, 'y').step(1).listen();
            f2.open();
        }
    }
}
