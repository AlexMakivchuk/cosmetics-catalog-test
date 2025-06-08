import { Component } from '@angular/core';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';

@Component({
  selector: 'app-root',
  imports: [ProductListComponent, ProductFiltersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'cosmetics-catalog';
}
