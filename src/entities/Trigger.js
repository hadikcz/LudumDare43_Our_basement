import GameItem from './GameItem';

export default class Trigger extends GameItem {
    /**
     * @param {GameScene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} triggerName
     * @param {object} config
     */
    constructor (scene, x, y, triggerName, config) {
        super(scene, x, y, 'trigger', config);

        this.type = 'Trigger';
        this.setVisible(false);

        /**
         * @type {string}
         */
        this.triggerName = triggerName;
    }

    getTriggerName () {
        return this.triggerName;
    }
}
