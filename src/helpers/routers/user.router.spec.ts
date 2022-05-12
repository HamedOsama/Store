import supertest from 'supertest';
import app from '../../index';
import jwt from 'jsonwebtoken';
import UserStore from '../../models/user.model';
import User from '../../types/user.type';
import UserRouter from '../../routes/api/users.routes';

const request = supertest(app);

const user: User = {
    email: 'test@test',
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'password123',
};
const user2: User = {
    email: 'test1@test',
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'password123',
};
const userStore = new UserStore();

const UserCreated = async (user: User) => {
    try {
        const createUser = await userStore.create(user);
        const token = jwt.sign(createUser, process.env.TOKEN_SECRET as string);
        return { testUser: createUser as User, testToken: token };
    } catch (err) {
        throw new Error(err as string);
    }
};

const TestUser = UserCreated(user);

describe('Testing Handlers of the Users', (): void => {
    it('Endpoint: /users [POST]', async (): Promise<void> => {
        const response = await request.post('/').send(user2);
        expect(response.status).toBe(404);
    });
});

export default TestUser;
