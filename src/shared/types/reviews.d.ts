export interface Reviews {
    readonly id:      number;
    readonly rating:  number;
    readonly review:  string | null;
    readonly user_uuid: string | null;
    readonly product: number;
}
