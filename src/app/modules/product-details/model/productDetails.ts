import { Review } from "./review";

export interface ProductDetails {
    id: number,
    name: string,
    description: string,
    fullDescription: string,
    price: number,
    currency: string,
    image: string,
    slug: string,
    reviews: Array<Review>
}