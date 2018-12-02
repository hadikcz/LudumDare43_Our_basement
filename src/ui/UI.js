import $ from 'jquery';
import Phaser from 'phaser';
import GameConfig from './../GameConfig';

export default class UI {
    /**
     * @param {Phaser.Scene} scene
     */
    constructor (scene) {
        /**
         * @type {Phaser.Scene}
         */
        this.scene = scene;

        this.temperatureText = this.scene.add.text(5, 222, '??°C', {fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });
        this.temperatureText.setDepth(GameConfig.DepthLayers.Text);
        this.temperatureText.setScale(0.25, 0.25);

        this.dayText = this.scene.add.text(5, 230, 'Day ???', {fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });
        this.dayText.setDepth(GameConfig.DepthLayers.Text);
        this.dayText.setScale(0.25, 0.25);

        this.boilerFilledText = this.scene.add.text(35, 225, 'Boiler capacity: ?%', {fontFamily: 'Verdana, Arial', fontSize: 25, color: '#FFFFFF' });
        this.boilerFilledText.setDepth(GameConfig.DepthLayers.Text);
        this.boilerFilledText.setScale(0.25, 0.25);

        this.scene.events.on('boilerTick', (percent) => {
            this.boilerFilledText.setText('Boiler capacity: ' + percent + '%');
        });

        this.scene.events.on('changeDay', (day) => {
            this.dayText.setText('Day ' + day);
        });

        this.scene.events.on('changedTemperature', (temperature) => {
            this.temperatureText.setText(temperature + '°C');
        });

        // characters
        let x = 115;
        this.faceYou = this.scene.add.image(x, 231, 'all', 'heads/you').setScale(2, 2).setDepth(GameConfig.DepthLayers.Text);
        this.youName = this.scene.add.text(x + 10, 222, 'You', {fontFamily: 'Verdana, Arial', fontSize: 28, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        x = 155;
        this.faceWife = this.scene.add.image(x, 231, 'all', 'heads/wife').setScale(2, 2).setDepth(GameConfig.DepthLayers.Text);
        this.wifeName = this.scene.add.text(x + 8, 222, 'Wife', {fontFamily: 'Verdana, Arial', fontSize: 28, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        x = 195;
        this.faceFather = this.scene.add.image(x, 231, 'all', 'heads/father').setScale(2, 2).setDepth(GameConfig.DepthLayers.Text);
        this.fatherName = this.scene.add.text(x + 8, 222, 'Father', {fontFamily: 'Verdana, Arial', fontSize: 28, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        x = 235;
        this.faceSon = this.scene.add.image(x, 231, 'all', 'heads/son').setScale(2, 2).setDepth(GameConfig.DepthLayers.Text);
        this.sonName = this.scene.add.text(x + 8, 222, 'Son', {fontFamily: 'Verdana, Arial', fontSize: 28, color: '#FFFFFF' }).setDepth(GameConfig.DepthLayers.Text).setScale(0.25, 0.25);

        this.youName.setColor('#FFDA00');
    }
}
