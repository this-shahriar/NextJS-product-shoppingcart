export interface ProductCardProps {
  product: ProductType;
}

export interface DemoDataType {
  max: number;
  min: number;
  products: ProductType[];
}

export interface ProductType {
  maxSelection: number;
  price: number;
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  selected?: number;
}

export interface SelectedTypes {
  selected?: ProductType[];
  setSelected?: any;
  demoData?: DemoDataType;
  addItem?: any; //improvement possible here
  removeItem?: any;
  isSelected?: any;
}
