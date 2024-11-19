// Block.test.js
import { Block } from '../Grid.js';


describe('Block', () => {
    let block;

    beforeEach(() => {
        block = new Block(0, 0);
    });

    test('should initialize with given coordinates', () => {
        expect(block.x).toBe(0);
        expect(block.y).toBe(0);
    });

    test('should initialize with AVAILABLE status', () => {
        expect(block.getStatus()).toBe(Block.Status.AVAILABLE);
    });

    test('should set status to OCCUPIED', () => {
        block.setAsOccupied();
        expect(block.getStatus()).toBe(Block.Status.OCCUPIED);
    });

    test('should set status to AVAILABLE', () => {
        block.setAsOccupied();
        block.setAsAvailable();
        expect(block.getStatus()).toBe(Block.Status.AVAILABLE);
    });

    test('should return correct string representation', () => {
        expect(block.toString()).toBe('Block { x=0, y=0 }');
    });
});