/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Check if a value is null, undefined, or an empty string
 * @param value
 * @returns
 */
export function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

export function omit<T extends object, K extends keyof T>(instance: T, ...fields: K[]): Omit<T, K> {
  const output: any = {}
  for (const [property, value] of Object.entries(instance)) {
    if ((fields as string[]).includes(property)) continue;
    output[property] = value;
  }
  return output
}

export function pick<T extends object, K extends keyof T>(instance: T, ...fields: K[]): Pick<T, K> {
  const output: any = {};
  for (const [property, value] of Object.entries(instance)) {
    if ((fields as string[]).includes(property)) output[property] = value
  }
  return output;
}
