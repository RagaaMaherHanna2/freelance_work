odoo.define('validate_pos_order_constraints.PaymentScreen', function (require) {
    'use strict';

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const Registries = require('point_of_sale.Registries');

    const ConstraintPaymentScreen = (PaymentScreen_) =>
        class extends PaymentScreen_ {

        async _isOrderValid(isForceValidate) {
            if (this.currentOrder.get_change() != 0.0) {
                    this.showPopup('ErrorPopup', {
                        title: this.env._t('Order Change'),
                        body: this.env._t(
                            'Order Change must equal 0.0.'
                        ),
                    });
                    return false;
            }
            return super._isOrderValid(isForceValidate);

        }
    };

    Registries.Component.extend(PaymentScreen, ConstraintPaymentScreen);

    return PaymentScreen;
});
