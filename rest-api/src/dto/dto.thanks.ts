export class CreateThanksDto {
    uid: number;
    tid: number|null;
    thank_to: number;
    description: string;
    date_created: string|Date|null;
}