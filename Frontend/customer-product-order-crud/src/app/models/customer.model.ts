import {CustomerOrder} from './customer-order.model'

export interface Customer {
    customerId?: number;
    customerName: string;
    customerSurname: string;
    customerPhoneNumber: string;
    customerEmail: string
    orders?: CustomerOrder[];
    isAdmin?: boolean
}
