import usersApi from '../../infrastructure/repositories/userApi';
import User from '../entities/User';

class UserService {
    async getUser(userId: number): Promise<User> {
        const userData = await usersApi.getUser(userId);
        return userData.data;
    }

    async updateUser(user: User): Promise<void> {
        if (!user) {
            return;
        }
        await usersApi.updateUser(user);
    }
}

export default UserService;
