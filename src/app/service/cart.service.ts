import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStore } from '../store/app.store';
import { tap } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';

@Injectable()
export class CartService {
    constructor(
        private httpClient: HttpClient,
        private store: AppStore
    ) {}

    getItemsInCart() {
        this.httpClient.get<ItemResponse>('/api/cart-items').pipe(
            tap(data => {
                if(!data || !data.items) {
                    // throw error
                }
                this.store.setCartItems(data.items);
            })
        ).subscribe();
    }

    addItemsToCart(items: CartItem[]) {
        this.httpClient.post('/api/cart-item', items).subscribe() ;

        items.forEach(item => {
            if (item.checked) {
                item.checked = false;
            }
        });
        // update cart items
        this.getItemsInCart();
    }

    updateItemInCart(item: CartItem) {
        this.httpClient.put(`/api/cart-item/${item.id}`, item).subscribe();
        this.getItemsInCart();
    }

    getAvailableItems() {
        this.httpClient.get<ItemResponse>('/api/available-items').pipe(
            tap(data => {
                if(data && data.items) {
                    this.store.setAvailableItems(data.items);
                }
            })
        ).subscribe();
    }
}

interface ItemResponse {
    items: [];
}