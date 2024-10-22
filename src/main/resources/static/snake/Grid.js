
export const Grid_Consts = {
    BLOCKSIZE: 20,
    BOARD_HEIGHT: 35,
    BOARD_WIDTH: 35
}



class Grid {

    static Block_Grid;

    constructor() {
        Grid.Block_Grid = Array.from({length: Grid_Consts.BOARD_HEIGHT}, (v, i) => i * Grid_Consts.BLOCKSIZE);
    }

    getRandomBlock() {
        let x = Math.floor(Math.random() * Grid_Consts.Block_Grid.length);
        let y = Math.floor(Math.random() * Grid_Consts.Block_Grid.length);

        if (this.isAvailable(x, y)) {
            return [Grid.Block_Grid[x], Grid.Block_Grid[y]];
        }

        return [Grid.Block_Grid[x], Grid.Block_Grid[y]];
    }

    isAvailable(x, y) {
        let block = getBlock(x, y);
        if (block === null) {
            this.setAsOccupied(block);
            return true;
        }
    }

    setAsOccupied(block) {
        block[2] = true;
    }

    getBlock(x, y) {
        return Grid.Block_Grid.find((block) => {
            return block[0] === x && block[1] === y;
        });
    }

}
