export const environment = {
    production: false,
    apiBaseURL : "http://localhost:8080/api/v1",


    apiEndpoints: {
        // Customer Endpoints
        customers_get_all : '/customers',
        customers_register: '/customers/register',
        customers_login: '/customers/login',
        customers_get_one: '/customers/',
        customers_add: '/customers',
        customers_update: '/customers/update/',
        customers_delete: '/customers/delete/',

        // Order Endpoints
        orders_get_by_customer: '/orders/customer/',
        orders_add: '/orders',
        orders_update: '/orders/update/',
        orders_delete: '/orders/delete/',

        // Product Endpoints
        products_get_all: '/products',
        products_add: '/products',
        products_update: '/products/',
        products_delete: '/products/delete/'

    }
};
