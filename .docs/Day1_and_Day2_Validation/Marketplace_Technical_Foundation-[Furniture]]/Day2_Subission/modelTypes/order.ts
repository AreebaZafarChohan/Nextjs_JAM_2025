// schemas/salesRecord.ts
import { Rule } from '@sanity/types';

export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'productId',
      title: 'Product ID',
      type: 'reference',
      to: [{ type: 'product' }], // Reference to the product schema
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'userId',
      title: 'User ID',
      type: 'reference',
      to: [{ type: 'user' }], // Reference to the user schema
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'orderData',
      title: 'Order Data',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'OrderDate',
              title: 'Order Date',
              type: 'datetime',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'totalAmount',
              title: 'Total Amount',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'status',
              title: 'Status',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'profitPerItem',
              title: 'Profit Per Item',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'originalPrice',
              title: 'Original Price',
              type: 'reference',
      to: [{ type: 'product' }], // Reference to the product schema
      validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'costPrice',
              title: 'Cost Price',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'totalProfit',
              title: 'Total Profit',
              type: 'number',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
