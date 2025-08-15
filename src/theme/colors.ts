export const colors = {
  petrolBlue: '#044953',
  lightPetrolBlue: '#107f80',
  orange: '#f16a25',
  salmon: '#b27d7d',
  sandyBrown: '#b2967d',
  darkKhaki: '#b2b27d',
  yellowGreen: '#99b27d',
  seaGreen: '#7db27d',
  darkAquamarine: '#7db296',
  turquoise: '#7db2b2',
  lightSteelBlue: '#7d99b2',
  slateBlue: '#7d7db2',
  plum: '#967db2',
  orchid: '#b07ab0',
  paleVioletRed: '#b27d99',
  white100: '#ffffff',
  white50: '#f5f5f5',
};

export type Color = keyof typeof colors;

export function isColor(color: Color | string): color is Color {
  return colors[color as Color] !== undefined;
}
