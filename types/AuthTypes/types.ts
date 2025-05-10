export interface CreateUserDto {
    email: string
    username: string
    name?: string
    profilePicture?: string
    favoriteSport?: string
    favoriteTeam?: string
}