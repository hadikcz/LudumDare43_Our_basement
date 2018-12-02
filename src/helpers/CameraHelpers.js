import GameConfig from './../GameConfig';

export default class PolygonHelpers {
    /**
     * @param {number} defaultWidth
     * @param {number} defaultHeight
     * @returns {number}
     */
    static calcBaseZoom (defaultWidth, defaultHeight) {
        let baseWidth = defaultWidth;
        let baseHeight = defaultHeight;

        let diffWidth = window.innerWidth / baseWidth;
        let diffHeight = window.innerHeight / baseHeight;

        return (diffWidth + diffHeight) / 2;
    }

    /**
     * @param camera
     * @param x
     * @param y
     * @param offsetX
     * @param offsetY
     * @return {boolean}
     */
    static isOnView (camera, x, y, offsetX, offsetY) {
        if (typeof offsetX === 'undefined') {
            offsetX = 80;
        }
        if (typeof offsetY === 'undefined') {
            offsetY = 80;
        }

        return x >= camera.x - offsetX && x <= camera.x - offsetX + camera.width + offsetX &&
            y >= camera.y - offsetY && y <= camera.y - offsetY + camera.height + offsetY;
    }

    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {number} distance
     * @return {boolean}
     */
    static isNearCamera (scene, x, y) {
        let cameraPoint = scene.cameras.main.midPoint;
        return Phaser.Math.Distance.Between(cameraPoint.x, cameraPoint.y, x, y) <= GameConfig.gameSize.height * 1.5;
    }
}
