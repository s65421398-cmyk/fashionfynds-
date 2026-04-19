import { describe, it, expect } from 'vitest';
import { cn, formatPrice } from '@/lib/utils';

describe('cn (className utility)', () => {
  it('merges class names correctly', () => {
    const result = cn('px-4', 'py-2');
    expect(result).toContain('px-4');
    expect(result).toContain('py-2');
  });

  it('handles empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toContain('base');
    expect(result).toContain('active');
  });

  it('handles falsy values', () => {
    const result = cn('base', false, null, undefined, 'extra');
    expect(result).toContain('base');
    expect(result).toContain('extra');
  });

  it('merges tailwind classes and resolves conflicts', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toBe('px-4');
  });
});

describe('formatPrice', () => {
  it('formats price with ₹ symbol', () => {
    const result = formatPrice(7499);
    expect(result).toBe('₹7,499');
  });

  it('formats zero price', () => {
    const result = formatPrice(0);
    expect(result).toBe('₹0');
  });

  it('formats large price with commas (Indian notation)', () => {
    const result = formatPrice(100000);
    expect(result).toBe('₹1,00,000');
  });

  it('formats price without decimal places', () => {
    const result = formatPrice(999);
    expect(result).toBe('₹999');
  });

  it('truncates decimal places', () => {
    const result = formatPrice(1299.99);
    // Should not show decimals based on the implementation
    expect(result).toContain('₹');
    expect(result).not.toContain('.99');
  });
});
