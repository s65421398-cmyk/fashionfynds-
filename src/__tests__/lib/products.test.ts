import { describe, it, expect } from 'vitest';
import { products, brands, collections, movements } from '@/lib/products';

describe('Products Data', () => {
  it('should have at least 10 products', () => {
    expect(products.length).toBeGreaterThanOrEqual(10);
  });

  it('every product should have required fields', () => {
    products.forEach((product) => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeTruthy();
      expect(product.brand).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.image).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(product.sizes.length).toBeGreaterThan(0);
      expect(product.colors.length).toBeGreaterThan(0);
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
      expect(typeof product.inStock).toBe('boolean');
    });
  });

  it('deal products should have original price higher than current price', () => {
    const dealProducts = products.filter((p) => p.deal && p.originalPrice);
    expect(dealProducts.length).toBeGreaterThan(0);
    dealProducts.forEach((product) => {
      expect(product.originalPrice!).toBeGreaterThan(product.price);
    });
  });

  it('should have unique product IDs', () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should contain featured products', () => {
    const featured = products.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
  });

  it('product ratings should be between 0 and 5', () => {
    products.forEach((product) => {
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
    });
  });

  it('product prices should be in INR range (positive numbers)', () => {
    products.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
      expect(Number.isFinite(product.price)).toBe(true);
    });
  });
});

describe('Brands Data', () => {
  it('should have at least 5 brands', () => {
    expect(brands.length).toBeGreaterThanOrEqual(5);
  });

  it('every brand should have name and logo', () => {
    brands.forEach((brand) => {
      expect(brand.name).toBeTruthy();
      expect(brand.logo).toBeTruthy();
      expect(brand.logo).toMatch(/^https?:\/\//);
    });
  });

  it('should have unique brand names', () => {
    const names = brands.map((b) => b.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});

describe('Collections Data', () => {
  it('should have at least 3 collections', () => {
    expect(collections.length).toBeGreaterThanOrEqual(3);
  });

  it('every collection should have required fields', () => {
    collections.forEach((collection) => {
      expect(collection.id).toBeTruthy();
      expect(collection.name).toBeTruthy();
      expect(collection.description).toBeTruthy();
      expect(collection.image).toBeTruthy();
    });
  });
});

describe('Movements Data', () => {
  it('should have at least 3 movements', () => {
    expect(movements.length).toBeGreaterThanOrEqual(3);
  });

  it('every movement should have required fields', () => {
    movements.forEach((movement) => {
      expect(movement.id).toBeTruthy();
      expect(movement.name).toBeTruthy();
      expect(movement.description).toBeTruthy();
      expect(movement.image).toBeTruthy();
    });
  });

  it('products should reference valid movements', () => {
    const movementNames = movements.map((m) => m.name);
    const productsWithMovement = products.filter((p) => p.movement);
    productsWithMovement.forEach((product) => {
      expect(movementNames).toContain(product.movement);
    });
  });
});
