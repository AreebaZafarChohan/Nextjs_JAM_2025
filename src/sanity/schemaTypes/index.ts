import { type SchemaTypeDefinition } from 'sanity'
import product from './modelTypes/product'
import salesRecord from './modelTypes/salesRecord'
import User from './modelTypes/User'
import Analytics from './modelTypes/Analytics'
import Inventory from './modelTypes/Inventory'
import shipment from './modelTypes/shipment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, salesRecord, User, Analytics, Inventory, shipment],
}
