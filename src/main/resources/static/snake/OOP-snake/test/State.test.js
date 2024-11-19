// State.test.js
import { State } from '../State.js';
import { Grid } from '../Grid.js';
import { SnakeEntity } from '../SnakeEntity.js';

describe('State', () => {
    let state;

    beforeEach(() => {
        state = new State();
    });

    test('should initialize with a grid, snake, and food', () => {
        expect(state.grid).toBeInstanceOf(Grid);
        expect(state.snake).toBeInstanceOf(SnakeEntity);
        expect(state.food).toBeInstanceOf(Object);
    });

    test('should update state correctly', () => {
        const initialFood = state.food;
        state.update();
        expect(state.food).not.toBe(initialFood);
    });

    test('should detect food eaten correctly', () => {
        state.snake.body[0] = state.food;
        expect(state.isFoodEaten()).toBe(true);
    });

    test('should detect collision with wall correctly', () => {
        state.snake.body[0].x = -1;
        expect(state.hasCollidedWithWall()).toBe(true);
    });

    test('should detect collision with itself correctly', () => {
        state.snake.body.push(state.snake.body[0]);
        expect(state.hasCollidedWithItself()).toBe(true);
    });
});