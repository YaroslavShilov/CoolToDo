import { ColorsType, DefaultDB } from "./types/types";
import { defaultDataBase } from "./defaultDB";
const defaultDB: DefaultDB = defaultDataBase;

export const randomId = (): number => {
  return +new Date();
};

export const findColor = (colors: ColorsType, colorId: number): string => {
  const findColor = colors.find((color) => color.id === colorId);
  return findColor ? findColor.color : "#000000";
};

export const localStorageGetItem = async <T, K extends keyof DefaultDB>(
  key: K
): Promise<T> => {
  return await JSON.parse(
    localStorage.getItem(key) || JSON.stringify(defaultDB[key])
  );
};

export const localStorageSetItem = async <T, K extends keyof DefaultDB>(
  key: K,
  obj: T
): Promise<void> => {
  await localStorage.setItem(key, JSON.stringify(obj));
};
