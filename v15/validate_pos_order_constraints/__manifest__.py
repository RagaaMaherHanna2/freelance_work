{
    'name': 'POS Validate Order',
    'category': 'Sales/Point of Sale',
    'sequence': 100,
    'summary': 'Constraint POS Order Validation',
    'description': "",
    'depends': ['point_of_sale'],
    'assets': {
        'point_of_sale.assets': [
            'validate_pos_order_constraints/static/src/js/PaymentScreen.js',
        ],
    },
    'license': 'LGPL-3',
}
