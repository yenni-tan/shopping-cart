import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartItem, Item } from '../models/cart-item.model';

@Injectable()
export class AppStore {
    private _cartItems = new BehaviorSubject<CartItem[]>([]);
    private _availableItems = new BehaviorSubject<Item[]>([]);

    getCartItems(): Observable<CartItem[]> {
       return this._cartItems.asObservable();
    }

    setCartItems(items: CartItem[]) {
        this._cartItems.next(items);
    }

    getAvailableItems(): Observable<Item[]> {
       return this._availableItems.asObservable();
    }

    setAvailableItems(items: Item[]) {
        this._availableItems.next(items);
    }

}