import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CartComponent } from './cart.component';
import { MatTableModule, MatCardModule, MatGridListModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import { AppStore } from 'src/app/store/app.store';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let injector: TestBed;
  let service: CartService;
  let store: AppStore;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatCardModule,
        MatGridListModule,
        MatButtonModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [ CartComponent ],
      providers: [ 
        CartService,
        AppStore
       ]
    })
    .compileComponents();

    injector = getTestBed();
    service = injector.get(CartService);
    store = injector.get(AppStore);
    httpMock = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when toggleAddForm() is called', () => {
    fit('then form is toggled and appropriate text is shown', () => {
      component.toggleAddForm();
      expect((component as any).showAvailableItems).toEqual(true);
      expect((component as any).showHideAvailableItemsText).toEqual('Hide Available Items');
    });
  });

  describe('when addItemsToCart() is called', () => {
    let testItems;
    beforeEach(() => {
      testItems = [  
        {
          "id": 1,
          "name": "puppy",
          "quantity": 1,
          "price": 100,
          "img": "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12231413/Labrador-Retriever-MP.jpg",
          "checked": true
        },
        {
          "id": 2,
          "name": "duck",
          "quantity": 1,
          "price": 200,
          "img": "https://img.buzzfeed.com/buzzfeed-static/static/enhanced/webdr06/2013/5/29/10/enhanced-buzz-12625-1369837568-0.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto",
          "checked": false
        }
      ];
      (component as any).availableItems = testItems;
    });
    fit('only selected items are added to the cart', () => {
      spyOn(service, 'addItemsToCart');
      component.addItemsToCart();
      expect(service.addItemsToCart).toHaveBeenCalledWith([testItems[0]]);
    });
  });

  describe('when saveUpatedQuantity() is called', () => {
    spyOn(service, 'updateItemInCart');
    component.updateItemInCart();
    expect(service.updateItemInCart).toHaveBeenCalledWith([testItems[0]]);
  })
});
