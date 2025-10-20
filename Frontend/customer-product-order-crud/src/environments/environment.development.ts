export const environment = {
    production: false,
    apiBaseURL : "http://localhost:8080/api/v1",


    apiEndpoints: {
        // Customer Endpoints
        customers_get_all : '/customers',
        customers_get_one: '/customers/',  
        customers_add: '/customers/add',
        customers_update: '/customers/update',
        customers_delete: '/customers/delete/',

        // Order Endpoints
        orders_get_by_customer: '/orders/customer/',
        orders_add: '/orders/add',
        orders_update: '/orders/update/',
        orders_delete: '/orders/delete/',

        // Product Endpoints
        products_get_all: '/products',
        products_add: '/products/add',
        products_update: '/products/update/',
        products_delete: '/products/delete/'

    }
};
