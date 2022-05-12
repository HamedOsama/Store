import UserModel from '../../models/user.model';

const userObject = new UserModel();

describe('Testing user model', (): void => {
    it('getAll method should be defined', (): void => {
        expect(userObject.getAll).toBeDefined();
    });

    it('getUser method should be defined', (): void => {
        expect(userObject.getUser).toBeDefined();
    });

    it('CREATE method should be defined', (): void => {
        expect(userObject.create).toBeDefined();
    });
    it('Delete method should be defined', (): void => {
        expect(userObject.del).toBeDefined();
    });
    it('authenticate method should be defined', (): void => {
        expect(userObject.authenticate).toBeDefined();
    });
});
