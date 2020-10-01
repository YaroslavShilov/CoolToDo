import { ColorsType } from "./types/types";

export const randomId = (): number => {
  return +new Date();
};

export const findColor = (colors: ColorsType, colorId: number): string => {
  const findColor = colors.find((color) => color.id === colorId);
  return findColor ? findColor.color : "#000000";
};
