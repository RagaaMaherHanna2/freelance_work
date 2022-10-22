odoo.define('em_pos_multi_uom.RefundChangeUom', function (require) {
    'use strict';

    const { useListener } = require('web.custom_hooks');
    const { isConnectionError } = require('point_of_sale.utils');
    const PosComponent = require('point_of_sale.PosComponent');
    const PosMultiUom = require('em_pos_multi_uom');
    const Registries = require('point_of_sale.Registries');

    class RefundChangeUom extends PosComponent {

        constructor() {

            super(...arguments);
            useListener('click', this._onClick);
        }

        get selectedOrderline() {
            const order = this.props.order
            return order.selected_orderline.product;
        }

        async _onClick()  {
            if (!this.selectedOrderline) return;
            var modifiers_list = [];
            var product = this.selectedOrderline;
            var em_uom_list = this.env.pos.em_uom_list;
            var multi_uom_ids = product.multi_uom_ids;
            for(var i=0;i<em_uom_list.length;i++){
                if(multi_uom_ids.indexOf(em_uom_list[i].id)>=0){
                    modifiers_list.push(em_uom_list[i]);
                }
            }
            await this.showPopup('MulitUOMWidget', {
                title: this.env._t(' POS Multi UOM '),
                modifiers_list:modifiers_list,
            });
        }
    }
    RefundChangeUom.template = 'RefundChangeUom';
    Registries.Component.add(RefundChangeUom);

    return RefundChangeUom;
});
