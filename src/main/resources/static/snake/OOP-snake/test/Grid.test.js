// Grid.test.js
import { Grid, Block, Grid_Consts } from '../Grid.js';

describe('Grid', () => {
    let grid;

    beforeEach(() => {
        grid = new Grid();
    });

    test('should initialize block grid with correct dimensions', () => {
        expect(grid.blockGrid.length).toBe(Grid_Consts.BOARD_WIDTH);
        expect(grid.blockGrid[0].length).toBe(Grid_Consts.BOARD_HEIGHT);
    });

    test('should return a random block', () => {
        const block = grid.getRandomBlock();
        expect(block).toBeInstanceOf(Block);
    });

    test('should return a specific block', () => {
        const block = grid.getSpecificBlock([0, 0]);
        expect(block).toBeInstanceOf(Block);
        expect(block.x).toBe(0);
        expect(block.y).toBe(0);
    });

    test('should set block as occupied', () => {
        const block = grid.getSpecificBlock([0, 0]);
        expect(block.getStatus()).toBe(block.Status.OCCUPIED);
    });

    test('should set block as available', () => {
        const block = grid.getSpecificBlock([0, 0]);
        grid.unuseBlock(block);
        expect(block.getStatus()).toBe(block.Status.AVAILABLE);
    });
});