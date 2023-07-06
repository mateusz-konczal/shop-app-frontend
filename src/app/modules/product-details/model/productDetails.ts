import { Review } from "./review";

export interface ProductDetails {
    id: number,
    name: string,
    description: string,
    fullDescription: string,
    price: number,
    salePrice: number,
    currency: string,
    image: string,
    slug: string,
    enabled: boolean,
    reviews: Array<Review>
}