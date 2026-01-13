export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: 'customer' | 'admin'
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateUserDTO extends Omit<User, 'id'> {}
