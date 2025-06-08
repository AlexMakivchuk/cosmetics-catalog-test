import { Component, inject, computed } from '@angular/core';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
})
export class ProductListComponent {
  private productService = inject(ProductService);

  // сигнал напряму
  readonly products = computed(() => this.productService.filteredProducts());
}
