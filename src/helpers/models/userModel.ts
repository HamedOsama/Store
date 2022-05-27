import UserModel from '../../models/user.model';
const user = new UserModel();
user.create({
    email: 'hamed1@gmail.com',
    user_name: 'hamed22',
    first_name: 'hamed',
    last_name: 'osama',
    password: '292002',
});
describe('User Model Test', () => {
    it('should have a create method [To Create New user]', () => {
        expect(user.create).toBeDefined();
    });
    it('createUser() should add a New User', async () => {
        const newUser = await user.create({
            email: 'hamedtest@gmail.com',
            user_name: 'hamed22',
            first_name: 'hamed',
            last_name: 'osama',
            password: '292002',
        });
        expect(newUser.id).toBe(newUser.id);
    });
    it('selectAllUsers() should return a list of All Available Users', async () => {
        const result = await user.getAll();
        expect(result.length).toBeGreaterThan(0); // Should Contains One or more user
    });

    it('selectUser() should return A Specific User', async () => {
        const userTest = await user.create({
            email: 'last@gmail.com',
            user_name: 'hamed22',
            first_name: 'hamed',
            last_name: 'osama',
            password: '292002',
        });
        const result = await user.getUser(userTest.id || '');
        expect(result).toBe(result);
    });
    it('deleteUser() should delete A Specific User', async () => {
        expect(await user.del).toBeTruthy();
    });
});
