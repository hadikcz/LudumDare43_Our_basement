/* eslint-disable no-trailing-spaces */
/* global __DEV__ */
import Phaser from 'phaser';
import EffectManager from './../effects/EffectManager';
import UI from './../ui/UI';
import GameConfig from './../GameConfig';
import Character from "../entities/Character";
import Controller from "../Controller";
import * as dat from 'dat.gui';

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

        /**
         * @type {Phaser.GameObjects.Group}
         * @private
         */
        this._colliders = null;
    }

    create (config) {
        this._colliders = this.add.group();

        this.physics.world.setBounds(0, 0, GameConfig.World.width, GameConfig.World.height);
        this.effectManager = new EffectManager(this);
        this.cameras.main.setOrigin(0, 0);
        this.cameras.main.startFollow({x: 0, y: 0});
        this.cameras.main.setZoom(GameConfig.GameWindowSettings.zoom);

        let bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0, 0);
        this._createColliders();

        this.character = new Character(this, 37, GameConfig.World.firstLevelY, 'man1');

        this.currentCharacter = this.character;

        this.controller = new Controller(this, this.character);

        this._initDebugUI();
    }

    update () {
        this.controller.update();

        this.physics.collide(this._colliders, this.character);
    }

    _initDebugUI () {
        this.debugGui = new dat.GUI();

        var f1 = this.debugGui.addFolder('Pointer position');
        f1.add(this.input.activePointer, 'worldX').listen();
        f1.add(this.input.activePointer, 'worldY').listen();
        f1.open();

        var f2 = this.debugGui.addFolder('Active character');
        f2.add(this.currentCharacter, 'x').step(1).listen();
        f2.add(this.currentCharacter, 'y').step(1).listen();
        f2.open();

        var f3 = this.debugGui.addFolder('Debug collider');
        f3.add(this._colliders.getChildren()[1], 'x').step(1).listen();
        f3.add(this._colliders.getChildren()[1], 'y').step(1).listen();
        f3.open();
    }

    _createColliders () {
        let rect = this.add.rectangle(0, 110, 16, 250, 0xFF0000, 0.25);
        this.physics.world.enable(rect);
        rect.body.setImmovable(true);
        rect.body.setSize(16, 250);
        this._colliders.add(rect);

        rect = this.add.rectangle(321, 110, 16, 250, 0xFF0000, 0.25);
        this.physics.world.enable(rect);
        rect.body.setImmovable(true);
        rect.body.setSize(16, 250);
        this._colliders.add(rect);
    }
}
