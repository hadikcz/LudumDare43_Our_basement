export default {
    list: [
        // furniture
        {
            id: 1,
            spriteKey: 'furniture/hazmat_wardrobe',
            type: 'furniture',
            name: 'hazmat suit',
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
            isPickable: false,
            canTakePiece: true,
            pieces: 15
        },
        {
            id: 3,
            spriteKey: 'furniture/table',
            type: 'furniture',
            name: 'table',
            actionName: 'Pick up',
            isPickable: true,
            canTakePiece: false,
            fuel: 5
        },
        {
            id: 4,
            spriteKey: 'furniture/small_table',
            type: 'furniture',
            name: 'small table',
            actionName: 'Pick up',
            isPickable: true,
            canTakePiece: false,
            fuel: 2.5
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
            fuel: 1
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
