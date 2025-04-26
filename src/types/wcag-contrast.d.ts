declare module 'wcag-contrast' {
  export function ratio(color1: number[], color2: number[]): number;
  export function score(ratio: number): 'AAA' | 'AA' | 'F';
  export function isValid(ratio: number): boolean;
} 