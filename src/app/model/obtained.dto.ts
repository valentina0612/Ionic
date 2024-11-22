import { UserDto } from "./user.dto";

export interface ObtainedDto{
    id: string;
    characterId: number;
    date: Date;
    location: string;
    method: string;
    user: UserDto;
}