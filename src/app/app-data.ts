import { ICategory } from "./core/models/category";
import { IProduct } from "./core/models/product";
import { CategoryData } from "./core/services/data/category-data";
import { ProductData } from "./core/services/data/product-data";
import { InMemoryDbService } from 'angular-in-memory-web-api';


export class AppData implements InMemoryDbService {

  createDb(): { products: IProduct[], categories: ICategory[]} {
    const products = ProductData.products;
    const categories = CategoryData.categories;
    return { products, categories };
  }
}