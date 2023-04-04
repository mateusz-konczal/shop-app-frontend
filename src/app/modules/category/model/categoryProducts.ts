import { Page } from "src/app/modules/common/model/page";
import { Product } from "../../common/model/product";
import { Category } from "./category";

export interface CategoryProducts {
    category: Category,
    products: Page<Product>
}