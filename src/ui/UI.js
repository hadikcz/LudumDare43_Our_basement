import $ from 'jquery';
import Phaser from 'phaser';
import GameConfig from './../GameConfig';
import Character from './../entities/Character';

export default class UI {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor (scene) {
        /**
         * @type {Phaser.Scene}
         */
        this.scene = scene;

        this.temperatureText = this.scene.add.text(5, 222, '??°C', { fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });
        this.temperatureText.setDepth(GameConfig.DepthLayers.Text);
        this.temperatureText.setScale(0.25, 0.25);

        this.dayText = this.scene.add.text(5, 230, 'Day ???', { fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });
        this.dayText.setDepth(GameConfig.DepthLayers.Text);
        this.dayText.setScale(0.25, 0.25);

        this.boilerFilledText = this.scene.add.text(35, 222, 'Boiler capacity: ?%', { fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);
        this.airFilterText = this.scene.add.text(35, 230, 'Air filter OK', { fontFamily: 'Verdana, Arial', fontSize: 25, color: '#00FF00' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        this.scene.events.on('boilerTick', (percent) => {
            this.boilerFilledText.setText('Boiler capacity: ' + percent + '%');
        });

        this.scene.events.on('changeDay', (day) => {
            this.dayText.setText('Day ' + day);
        });

        this.scene.events.on('changedTemperature', (temperature) => {
            this.temperatureText.setText(temperature + '°C');
        });

        this.scene.events.on('switchedCharacter', (/** @type {Character} */ character) => {
            let target;
            if (character.name === 'you') {
                target = this.youName;
            }
            if (character.name === 'wife') {
                target = this.wifeName;
            }
            if (character.name === 'father') {
                target = this.fatherName;
            }
            if (character.name === 'son') {
                target = this.sonName;
            }

            this.youName.setColor('#FFFFFF');
            this.wifeName.setColor('#FFFFFF');
            this.fatherName.setColor('#FFFFFF');
            this.sonName.setColor('#FFFFFF');
            target.setColor('#FFDA00');
        });

        // characters
        let x = 115;
        this.faceYou = this.scene.add.image(x, 231, 'all', 'heads/you').setScale(2, 2).setDepth(GameConfig.DepthLayers.Text);
        this.youName = this.scene.add.text(x + 10, 222, 'You', { fontFamily: 'Verdana, Arial', fontSize: 28, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);
        this.youHp = this.scene.add.text(x + 10, 230, '100%', { fontFamily: 'Verdana, Arial', fontSize: 24, color: '#ff5f58' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        x = 155;
        this.faceWife = this.scene.add.image(x, 231, 'all', 'heads/wife').setScale(2, 2).setDepth(GameConfig.DepthLayers.Text);
        this.wifeName = this.scene.add.text(x + 8, 222, 'Wife', { fontFamily: 'Verdana, Arial', fontSize: 28, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);
        this.wifeHp = this.scene.add.text(x + 10, 230, '100%', { fontFamily: 'Verdana, Arial', fontSize: 24, color: '#ff5f58' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        x = 195;
        this.faceFather = this.scene.add.image(x, 231, 'all', 'heads/father').setScale(2, 2).setDepth(GameConfig.DepthLayers.Text);
        this.fatherName = this.scene.add.text(x + 8, 222, 'Father', { fontFamily: 'Verdana, Arial', fontSize: 28, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);
        this.fatherHp = this.scene.add.text(x + 10, 230, '100%', { fontFamily: 'Verdana, Arial', fontSize: 24, color: '#ff5f58' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        x = 235;
        this.faceSon = this.scene.add.image(x, 231, 'all', 'heads/son').setScale(2, 2).setDepth(GameConfig.DepthLayers.Text);
        this.sonName = this.scene.add.text(x + 8, 222, 'Son', { fontFamily: 'Verdana, Arial', fontSize: 28, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);
        this.sonHp = this.scene.add.text(x + 10, 230, '100%', { fontFamily: 'Verdana, Arial', fontSize: 24, color: '#ff5f58' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        this.youName.setColor('#FFDA00');

        this.scene.events.on('changedHealths', (/** @type {Character} */ character) => {
            let target;
            if (character.name === 'you') {
                target = this.youHp;
            }
            if (character.name === 'wife') {
                target = this.wifeHp;
            }
            if (character.name === 'father') {
                target = this.fatherHp;
            }
            if (character.name === 'son') {
                target = this.sonHp;
            }

            target.setText(character.getHealthPercent() + '%');
        }, this);

        this.scene.events.on('airFilterChangeState', (isOk) => {
            if (isOk) {
                this.airFilterText.setText('Air filter OK');
                this.airFilterText.setColor('#00FF00');
            } else {
                this.airFilterText.setText('Air filter is BROKEN');
                this.airFilterText.setColor('#FF0000');
            }
        }, this);
    }
}
