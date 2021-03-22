import { extractDestination } from '../js/common';

describe('Validating Destination TextBox', () => {
  test('When Only the PostalCode is entered, Must pass value', () => {
    const destination = '12423';
    const result = extractDestination(destination);
    expect(result).toBeDefined();
    expect(result.postalcode).toMatch(destination);
  });

  test('When Both City/State and PostalCode is entered, Must pass value', () => {
    const destination = 'Somewhere, NY 12342';
    const city = destination.split(',')[0];
    const result = extractDestination(destination);
    expect(result).toBeDefined();
    expect(result.city).toMatch(city);
  });
});
