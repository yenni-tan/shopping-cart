export interface CartItem extends Item {
    quantity: number;
}

export interface Item {
    name: string;
    quantity: number;
    price: number;
    id: number;
    checked: boolean;
}
  