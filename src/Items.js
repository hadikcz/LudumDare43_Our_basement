export default {
    list: [
        // furniture
        {
            id: 1,
            spriteKey: 'furniture/hazmat_wardrobe',
            type: 'furniture',
            name: 'hazmat suit (lost key)',
            actionName: 'Take a',
            isPickable: false,
            canTakePiece: true,
            pieces: 2
        },
        {
            id: 2,
            spriteKey: 'furniture/library',
            type: 'furniture',
            name: 'book',
            actionName: 'Take a',
            emptyActionName: 'Pick up library',
            isPickable: true,
            canTakePiece: true,
            pieces: 8,
            generatePieceName: 'items/book',
            fuel: 35,
            sprites: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ]
        },
        {
            id: 3,
            spriteKey: 'furniture/table',
            type: 'furniture',
            name: 'table',
            actionName: 'Pick up',
            isPickable: true,
            canTakePiece: false,
            fuel: 35
        },
        {
            id: 4,
            spriteKey: 'furniture/small_table',
            type: 'furniture',
            name: 'small table',
            actionName: 'Pick up',
            isPickable: true,
            canTakePiece: false,
            fuel: 25
        },
        {
            id: 5,
            spriteKey: 'furniture/coal',
            type: 'furniture',
            name: 'coal',
            actionName: 'Take some',
            emptyActionName: 'No coal',
            isPickable: false,
            canTakePiece: true,
            pieces: 10,
            generatePieceName: 'items/coalPiece',
            origin: [1, 1],
            sprites: [
                1,
                1,
                2,
                2,
                3,
                3,
                4,
                4,
                5,
                5
            ]
        },

        // items
        {
            id: 50,
            spriteKey: 'items/book',
            type: 'item',
            name: 'book',
            actionName: 'Pick up',
            isPickable: true,
            canTakePiece: false,
            fuel: 15
        },
        {
            id: 50,
            spriteKey: 'items/coalPiece',
            type: 'item',
            name: 'coal',
            actionName: 'Pick up',
            isPickable: true,
            canTakePiece: false,
            fuel: 30
        },
        // Triggers
        {
            id: 150,
            spriteKey: 'goToSurface',
            type: 'trigger',
            actionName: 'Go to surface (Die ?)'
        },
        {
            id: 150,
            spriteKey: 'goToSecondFloor',
            type: 'trigger',
            actionName: 'Use ladder'
        },
        {
            id: 150,
            spriteKey: 'goToFirstFloor',
            type: 'trigger',
            actionName: 'Use ladder'
        },
        {
            id: 150,
            spriteKey: 'fixAirFilter',
            type: 'trigger',
            actionName: 'Fix air filter'
        },
        {
            id: 150,
            spriteKey: 'returnToShelter',
            type: 'trigger',
            actionName: 'Return to shelter'
        }

    ],
    /**
     * @param {string} spriteKey
     * @return {{id: number, spriteKey: string, type: string, name: string, actionName: string, isPickable: boolean, canTakePiece: boolean, pieces: number}|undefined}
     */
    getItemBySpriteKey (spriteKey) {
        return this.list.find((element) => {
            return element.spriteKey === spriteKey;
        });
    },
};
