import UserRole from "./UserRole";

interface User {
    id?: number,
    email?: string,
    firstname?: string,
    lastname?: string,
    username?: string,
    password?: string,
    status?: string,
    enabled?: boolean,

}

export default User;
