import { UserDto } from "./user.dto";

export interface FavoriteDto {
    id: string;
    characterId: number;
    user: UserDto;
}