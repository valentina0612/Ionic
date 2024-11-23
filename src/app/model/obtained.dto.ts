import { UserDto } from "./user.dto";

export interface ObtainedDto{
    id: string;
    characterId: number;
    location: { lat: number, lng: number };
    method: string;
    user: UserDto;
}