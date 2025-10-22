import { Customer } from "./customer.model";
import { Product } from "./product.model";

export interface CustomerOrder {
    customerOrderId?: number;
    orderReferenceNumber?: string;
    customer: Customer;
    product: Product;
    customerOrderQuantity: number;
}
