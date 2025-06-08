import { computed, Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';

type SortField = 'name' | 'price';
type SortDirection = 'asc' | 'desc';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Lipstick",
      category: "Makeup",
      price: 25,
      imageUrl: "assets/product_images/product_1.png",
      description: "Long-lasting creamy lipstick with a satin finish, perfect for both day and evening looks."
    },
    {
      id: 2,
      name: "Face Cream",
      category: "Skincare",
      price: 40,
      imageUrl: "assets/product_images/product_2.png",
      description: "Hydrating face cream enriched with vitamin E and hyaluronic acid for all skin types."
    },
    {
      id: 3,
      name: "Body Lotion",
      category: "Bodycare",
      price: 30,
      imageUrl: "assets/product_images/product_3.png",
      description: "Lightweight, fast-absorbing body lotion with a delicate floral scent and 24-hour hydration."
    },
    {
      id: 4,
      name: "Mascara",
      category: "Makeup",
      price: 35,
      imageUrl: "assets/product_images/product_4.png",
      description: "Volumizing black mascara with a curved brush for defined, dramatic lashes."
    },
    {
      id: 5,
      name: "Sunscreen SPF50",
      category: "Skincare",
      price: 28,
      imageUrl: "assets/product_images/product_5.png",
      description: "Broad-spectrum SPF50 protection with a non-greasy formula. Suitable for sensitive skin."
    },
    {
      id: 6,
      name: "Nail Polish",
      category: "Makeup",
      price: 15,
      imageUrl: "assets/product_images/product_6.png",
      description: "High-shine, quick-dry nail polish in a vibrant coral shade. Chip-resistant formula."
    },
    {
      id: 7,
      name: "Hair Serum",
      category: "Bodycare",
      price: 45,
      imageUrl: "assets/product_images/product_7.png",
      description: "Nourishing serum that reduces frizz, adds shine, and protects hair from heat styling."
    },
    {
      id: 8,
      name: "Blush",
      category: "Makeup",
      price: 22,
      imageUrl: "assets/product_images/product_8.png",
      description: "Silky matte powder blush for a natural flush of color. Blendable and long-lasting."
    },
    {
      id: 9,
      name: "Facial Toner",
      category: "Skincare",
      price: 38,
      imageUrl: "assets/product_images/product_9.png",
      description: "Refreshing toner that balances skin pH and tightens pores without drying."
    },
    {
      id: 10,
      name: "Facial Cream",
      category: "Skincare",
      price: 20,
      imageUrl: "assets/product_images/product_10.png",
      description: "Rich facial cream with peptides and antioxidants for deep nourishment and skin renewal."
    }
];

  search = signal('');
  category = signal('');
  priceRange = signal<[number, number]>([0, 100]);

  sortBy = signal<SortField>('name');
  sortDir = signal<SortDirection>('asc');

  readonly filteredProducts = computed(() => {
    const search = this.search().toLowerCase();
    const category = this.category();
    const [min, max] = this.priceRange();
    const sortBy = this.sortBy();
    const sortDir = this.sortDir();

    return this.products
      .filter((p) =>
        p.name.toLowerCase().includes(search) &&
        (category ? p.category === category : true) &&
        p.price >= min && p.price <= max
      )
      .sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        if (valA < valB) return sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return sortDir === 'asc' ? 1 : -1;

        return 0;
      });
  });

  setSort(by: SortField, dir: SortDirection) {
    this.sortBy.set(by);
    this.sortDir.set(dir);
  }

  setSearch(term: string) {
    this.search.set(term);
  }

  setCategory(cat: string) {
    this.category.set(cat);
  }

  setPriceRange(range: [number, number]) {
    this.priceRange.set(range);
  }
}
