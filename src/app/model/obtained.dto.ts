import { UserDto } from "./user.dto";

export interface ObtainedDto{
    id: string;
    characterId: number;
    date: Date;
    location: { lat: number, lng: number };
    method: string;
    user: UserDto;
}