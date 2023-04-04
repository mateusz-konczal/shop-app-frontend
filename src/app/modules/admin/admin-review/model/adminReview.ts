export interface AdminReview {
    id: number,
    productId: number,
    authorName: string,
    content: string,
    moderated: boolean
}