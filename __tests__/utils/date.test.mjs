import { getDaysInMonth } from '../../utils/date.mjs'

describe('getDaysInMonth', () => {
  test('should return the correct number of days for February in a leap year', () => {
    // February (index 1) in a leap year (e.g., 2020) has 29 days
    expect(getDaysInMonth(1, 2020)).toBe(29);
  });

  test('should return the correct number of days for February in a non-leap year', () => {
    // February (index 1) in a non-leap year (e.g., 2021) has 28 days
    expect(getDaysInMonth(1, 2021)).toBe(28);
  });

  test('should return the correct number of days for a 31-day month', () => {
    // January (index 0) has 31 days
    expect(getDaysInMonth(0, 2022)).toBe(31);
  });

  test('should return the correct number of days for a 30-day month', () => {
    // April (index 3) has 30 days
    expect(getDaysInMonth(3, 2023)).toBe(30);
  });
});
