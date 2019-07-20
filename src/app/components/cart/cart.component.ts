import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { tap } from 'rxjs/operators';
import { AppStore } from 'src/app/store/app.store';
import { CartItem, Item } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private itemsInCart$: Observable<CartItem[]>
  private availableItems$: Observable<Item[]>;
  private availableItems: Item[];

  private displayedColumns: string[] = ['name', 'quantity', 'price'];
  private total = 0;

  private showAvailableItems = false;
  private showHideAvailableItemsText = 'Show Available Items';

  constructor(
    private cartService: CartService,
    private store: AppStore) { }

  @HostBinding('class.cart')

  ngOnInit() {
    this.cartService.getItemsInCart();
    this.cartService.getAvailableItems();
    this.itemsInCart$ = this.store.getCartItems()
      .pipe(
        tap(items => {
          this.total = items.reduce((sum, current) => sum + current.price * current.quantity, 0);
        }));

    this.availableItems$ = this.store.getAvailableItems()
      .pipe(
        tap(items => this.availableItems = items)
      );
  }
  
  toggleAddForm() {
    this.showAvailableItems = !this.showAvailableItems;
    if (this.showAvailableItems) {
      this.showHideAvailableItemsText = 'Hide Available Items';
    } else {
      this.showHideAvailableItemsText = 'Show Available Items';
    }
  }

  addItemsToCart() {
    const itemsToAdd = this.availableItems.filter(item => item.checked);
    this.cartService.addItemsToCart(itemsToAdd);
  }

  saveUpdatedQuantity(event, item) {
    if (event && event.target && event.target.value) {
      const updatedItem = {
        id: item.id,
        name: item.name,
        quantity: event.target.value,
        price: item.price,
        checked: item.checked
      };
      this.cartService.updateItemInCart(updatedItem);
    }
  }

}
