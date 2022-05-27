import supertest from 'supertest';
import app from '../../index';
import jwt from 'jsonwebtoken';
import UserStore from '../../models/user.model';
import User from '../../types/user.type';

const request = supertest(app);
const user: User = {
    email: 'test@test',
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'password123',
};
const user2: User = {
    email: 'test1sss@test',
    user_name: 'test',
    first_name: 'test',
    last_name: 'test',
    password: 'password12v3',
};
const userStore = new UserStore();
const result = userStore.create(user);
let createUser: User;
let token = '';
const UserCreated = async (user: User) => {
    try {
        createUser = await userStore.create(user);
        token = jwt.sign(createUser, process.env.TOKEN_SECRET as string);
        return {testUser: createUser as User, testToken: token};
    } catch (err) {
        throw new Error(err as string);
    }
};

const TestUser = UserCreated(user);

describe('Testing Handlers of the Users', (): void => {
    it('Endpoint: /users [POST]', async (): Promise<void> => {
        const firstResponse = await request.post('/api/users').send(user2);
        expect(firstResponse.statusCode).toBe(200);
    });
    it('Endpoint: /users [GET]', async (): Promise<void> => {
        const response = await request
            .get('/api//users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    it('Endpoint: /user [GET]', async (): Promise<void> => {
        const response = await request
            .get(`/api/users/${(await result).id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    });
    it('Endpoint: /users/signin [POST]', async (): Promise<void> => {
        const response = await request
            .post(`/api/users/signin/`)
            .send({
                email: 'test1sss@test',
                password: 'password12v3',
            })
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        console.log(response.text);
    });
    it('Endpoint: /users/ [DELETE]', async (): Promise<void> => {
        const response = await request
            .delete(`/api/users/${(await result).id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        console.log(response.text);
    });
});

export default TestUser;
