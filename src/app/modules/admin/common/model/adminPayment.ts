export interface AdminPayment {
    id: number,
    name: string,
    type: string,
    defaultPayment: boolean,
    enabled: boolean,
    note: string
}