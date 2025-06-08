import { Component, computed, effect, inject, signal } from '@angular/core';
import { Options, NgxSliderModule } from '@angular-slider/ngx-slider';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  templateUrl: './product-filters.component.html',
  imports: [NgxSliderModule],
})
export class ProductFiltersComponent {
  private readonly productService = inject(ProductService);

  readonly categories = ['Makeup', 'Skincare', 'Bodycare'];

  // Signals з явними типами
  readonly searchTerm = signal<string>('');
  readonly selectedCategory = signal<string>('');
  readonly minPrice = signal<number>(0);
  readonly maxPrice = signal<number>(100);

  readonly sortBy = this.productService.sortBy;
  readonly sortDir = this.productService.sortDir;

  readonly sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
  };

  // Ефект, який відправляє дані в сервіс, коли щось змінюється
  readonly syncFiltersEffect = effect(() => {
    this.productService.setSearch(this.searchTerm());
    this.productService.setCategory(this.selectedCategory());
    this.productService.setPriceRange([this.minPrice(), this.maxPrice()]);
  });

  // Обробники подій
  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory.set((event.target as HTMLSelectElement).value);
  }

  onMinPriceChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value || 0;
    this.minPrice.set(value);
  }

  onMaxPriceChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value || 100;
    this.maxPrice.set(value);
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('');
    this.minPrice.set(0);
    this.maxPrice.set(100);
  }

  onSortFieldChange(event: Event): void {
    const field = (event.target as HTMLSelectElement).value as 'name' | 'price';

    this.productService.sortBy.set(field);
  }

  onSortDirectionChange(event: Event): void {
    const dir = (event.target as HTMLSelectElement).value as 'asc' | 'desc';

    this.productService.sortDir.set(dir);
  }

  setSortBy(field: 'name' | 'price'): void {
    this.productService.setSort(field, this.sortDir());
  }

  toggleSortDir(): void {
    const newDir = this.sortDir() === 'asc' ? 'desc' : 'asc';
    this.productService.setSort(this.sortBy(), newDir);
  }
}
