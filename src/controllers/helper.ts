export interface ISortValueAsc {
  newest?: number;
  distance?: number;
  averageProductPrice?: number;
  deliveryCosts?: number;
  minCost?: number;
}

export interface ISortValueDesc {
  bestMatch?: number;
  ratingAverage?: number;
  popularity?: number;
  topRestaurants?: number;
}

const stringLitArray = <L extends string>(arr: L[]) => arr;
const IAscKeys = stringLitArray([
  'newest',
  'distance',
  'averageProductPrice',
  'deliveryCosts',
  'minCost',
]);
const IDescKeys = stringLitArray([
  'bestMatch',
  'ratingAverage',
  'popularity',
  'topRestaurants',
]);
type SortAscValues = (typeof IAscKeys)[number];
export const isAsc = (x: any): x is SortAscValues => IAscKeys.includes(x);

export type SortDescValues = (typeof IDescKeys)[number];
export const isDesc = (x: any): x is SortDescValues => IDescKeys.includes(x);

//Merge the two interfaces into one
export type ISortValue = ISortValueAsc & ISortValueDesc;

export interface IRestaurant {
  name: String;
  status: String;
  sortingValues: ISortValue;
}
