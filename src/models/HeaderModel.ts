import { BaseEntry } from '@contentstack/delivery-sdk'
import { SellingPointModel } from './SellingpointModel';
//import { SellingPointModel } from './SellingpointModel'

export interface PortfolioHeaderModel extends BaseEntry {
  title : string;
  selling_points : SellingPointModel[];
}