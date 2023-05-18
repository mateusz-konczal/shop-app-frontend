export interface AdminUserReadDto {
    id: number,
    username: string,
    enabled: boolean,
    userRoles: Array<string>
}