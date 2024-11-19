// SnakeEntity.test.js
import { SnakeEntity } from '../SnakeEntity.js';
import { Grid } from '../Grid.js';

describe('SnakeEntity', () => {
    let snake;
    let grid;

    beforeEach(() => {
        grid = new Grid();
        snake = new SnakeEntity(grid);
    });

    test('should initialize with a random block as head', () => {
        expect(snake.body.length).toBe(1);
        expect(snake.body[0]).toBeInstanceOf(Object);
    });

    test('should set direction correctly', () => {
        snake.setDirection(1);
        expect(snake.direction).toBe(1);
    });

    test('should not set opposite direction', () => {
        snake.setDirection(1);
        snake.setDirection(3);
        expect(snake.direction).toBe(1);
    });

    test('should update position correctly', () => {
        snake.setDirection(1);
        snake.updatePos();
        expect(snake.body[0].y).toBe(snake.body[1].y - 1);
    });

    test('should update body correctly when food is not eaten', () => {
        const initialLength = snake.body.length;
        snake.updateBody(false);
        expect(snake.body.length).toBe(initialLength - 1);
    });

    test('should update body correctly when food is eaten', () => {
        const initialLength = snake.body.length;
        snake.updateBody(true);
        expect(snake.body.length).toBe(initialLength);
    });
});