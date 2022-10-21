# -*- coding: utf-8 -*-
from odoo import fields, models, api


class MrpReport(models.Model):
    _inherit = 'mrp.report'

    unit_list_price = fields.Float(
        "List Price Cost / Unit", readonly=True)

    def _select(self):
        select_str = super(MrpReport, self)._select()
        select_str = select_str + """,\n
                max(pt.list_price)          AS unit_list_price
        """
        return select_str

    def _from(self):
        from_str = super(MrpReport, self)._from()
        from_str = from_str + """\n
            LEFT JOIN product_product AS pp on pp.id = mo.product_id
            LEFT JOIN product_template AS pt on pt.id = pp.product_tmpl_id
        """
        return from_str