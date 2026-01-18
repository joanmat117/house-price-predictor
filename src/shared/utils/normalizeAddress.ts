/**
 * Normalizes Colombian address components for better geocoding accuracy
 */

const typeWayNormalization: Record<string, string> = {
  'calle': 'Calle',
  'cl': 'Calle',
  'cl.': 'Calle',
  'carrera': 'Carrera',
  'cra': 'Carrera',
  'cra.': 'Carrera',
  'kr': 'Carrera',
  'avenida': 'Avenida',
  'av': 'Avenida',
  'av.': 'Avenida',
  'avda': 'Avenida',
  'avda.': 'Avenida',
  'diagonal': 'Diagonal',
  'dg': 'Diagonal',
  'dg.': 'Diagonal',
  'transversal': 'Transversal',
  'tv': 'Transversal',
  'tv.': 'Transversal',
  'circular': 'Circular',
  'cir': 'Circular',
  'cir.': 'Circular',
};

/**
 * Normalizes the type of way (street type)
 */
export function normalizeTypeWay(typeWay: string): string {
  const normalized = typeWayNormalization[typeWay.toLowerCase().trim()];
  return normalized || typeWay;
}

/**
 * Normalizes city names to proper case
 */
export function normalizeCity(city: string): string {
  return city
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Formats Colombian address components into a standardized format
 * Example: Calle 10 # 50-25
 */
export function formatColombianAddress(
  typeWay: string,
  number1: string,
  block1?: string,
  block2?: string
): string {
  const normalizedTypeWay = normalizeTypeWay(typeWay);
  let address = `${normalizedTypeWay} ${number1.trim()}`;
  
  if (block1?.trim()) {
    address += ` # ${block1.trim()}`;
    if (block2?.trim()) {
      address += `-${block2.trim()}`;
    }
  }
  
  return address;
}

/**
 * Validates Colombian postal code format (6 digits)
 */
export function isValidColombianPostalCode(postalCode: string): boolean {
  return /^\d{6}$/.test(postalCode.trim());
}
