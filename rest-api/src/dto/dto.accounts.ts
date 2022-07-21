export class AccountsCreationDto {
    id: number;
    name: string;
    address: { street : string, zip : string };
    phone: string;
    picture: string;
    is_active: boolean;
    date_created: string;
}