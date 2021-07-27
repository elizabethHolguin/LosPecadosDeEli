export interface User{
    id : string;
    username : string;
    is_superuser: boolean;
    first_name?: string;
    last_name?: string;
    email?: string;
}

export interface UserClient{
    userID : string;
    direction : string;
    city: string;
}