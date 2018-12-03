import GameScene from '../scenes/GameScene';
import GameConfig from "../GameConfig";
import Character from '../entities/Character.js';

export default class CharacterManager {

    /**
     * @param {GameScene} scene
     * @param {Character} character
     */
    constructor (scene, character) {
        this.scene = scene;

        /**
         * @type {Character[]}
         * @private
         */
        this._characters = [];

        /**
         * Currently controlled character
         * @type {Character}
         */
        this.character = character;

        /**
         * @type {number}
         * @private
         */
        this._position = 0;

        this._createCharacters();

        this.scene.events.on('switchCharacter', this._switchCharacter, this);
    }

    /**
     * @return {Character[]}
     */
    getCharacters () {
        return this._characters;
    }

    _createCharacters () {
        let spawn = this._getRandomSpawn();
        this._characters.push(new Character(this.scene, spawn.x, spawn.y, 'man1', 'you'));

        spawn = this._getRandomSpawn();
        this._characters.push(new Character(this.scene, spawn.x, spawn.y, 'woman1', 'wife'));

        spawn = this._getRandomSpawn();
        this._characters.push(new Character(this.scene, spawn.x, spawn.y, 'man2', 'father'));

        spawn = this._getRandomSpawn();
        this._characters.push(new Character(this.scene, spawn.x, spawn.y, 'child1', 'son'));

        this.character = this._characters[this._position];
        this.character.setIsControllerByPlayer(true);
        this.scene.controller.setControlledCharacter(this.character);
    }

    _switchCharacter () {
        this._position++;
        if (this._position > 3) {
            this._position = 0;
        }

        this._characters.forEach((character) => {
            character.setIsControllerByPlayer(false);
        });

        this.character = this._characters[this._position];
        this.character.setIsControllerByPlayer(true);
        this.scene.controller.setControlledCharacter(this.character);
        this.scene.events.emit('switchedCharacter', this.character);
    }

    _getRandomSpawn () {
        if (Phaser.Math.RND.integerInRange(0, 1)) {
            return {
                x: Phaser.Math.RND.integerInRange(18, 259),
                y: GameConfig.World.firstLevelY
            };
        } else {
            return {
                x: Phaser.Math.RND.integerInRange(53, 300),
                y: GameConfig.World.secondLevelY
            };
        }
    }
}
