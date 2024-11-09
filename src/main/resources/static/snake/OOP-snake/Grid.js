
export const Grid_Consts = {
    BLOCK_SIZE: 20,
    BOARD_HEIGHT: 35,
    BOARD_WIDTH: 35,
    CANVAS_HEIGHT: 35*20,
    CANVAS_WIDTH: 35*20
}

export class Block {
    Status = {
        OCCUPIED: true,
        AVAILABLE: false
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.status = this.Status.AVAILABLE;
    }

    getStatus() {
        return this.status;
    }

    setAsOccupied() {
        this.status = this.Status.OCCUPIED;
    }

    setAsAvailable() {
        this.status = this.Status.AVAILABLE;
    }

    toString() {
        return "Block { x="+this.x+", y="+this.y+" }"
    }
}

export class Grid {
    constructor() {
        this.initBlockGrid();
        console.log("block grid: ", this.blockGrid.length, this.blockGrid[0].length);
    }

    initBlockGrid() {
        this.blockGrid =
            Array.from({ length: Grid_Consts.BOARD_WIDTH }, (_, x) =>
            Array.from({ length: Grid_Consts.BOARD_HEIGHT }, (_, y) => new Block(x, y)));
    }

    // ----------------- Main Operations for Outside -----------------
    getRandomBlock() {
        let block = null;
        do {
            block = this.getSpecificBlock(this.generateRandomPosition());
        } while(block === null);

        console.log("random block: ", block);

        return this.useBlock(block);
    }

    getSpecificBlock([x,y]){
        const block = this.getBlock([x,y]);
        if (this.isAvailable(block))
            return this.useBlock(block);
        return null;
    }

    unuseBlock(block) {
        block.setAsAvailable();
        this.updateBlockGrid(block);
    }

    // ----------------- Getters -----------------
    getBlock([x, y]) {
        return this.blockGrid[x][y];
    }

    // ----------------- Setters -----------------
    useBlock(block) {
        block.setAsOccupied();
        this.updateBlockGrid(block);
        console.log("block used: ", block);
        return block;
    }

    // ----------------- Helpers -----------------
    updateBlockGrid(block) {
        this.blockGrid[block.x][block.y] = block;
    }

    generateRandomPosition() {
        const x = Math.floor(Math.random() * Grid_Consts.BOARD_WIDTH); // 0-34
        const y = Math.floor(Math.random() * Grid_Consts.BOARD_HEIGHT); // 0-34
        console.log("random position: ", x, y);
        return [x, y];
    }

    isAvailable(block) {
        return block.getStatus() === block.Status.AVAILABLE;
    }
}
