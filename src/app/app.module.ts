import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule, MatCardModule, MatGridListModule, MatButtonModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './service/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppStore } from './store/app.store';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CartService,
    AppStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
