import {PhotoModel} from './Photo.model';
import {ProductPriceModel} from './ProductPrice.model';

export class ProductModel {
    public id_product: number;
    public id_garment: number;
    public id_trademark: number;
    public name_product: string;
    public gender_product: string;
    public status_product: string;
    public photos = new Array<PhotoModel>();
    public prices = new Array<ProductPriceModel>();
    public date: Date;
}
