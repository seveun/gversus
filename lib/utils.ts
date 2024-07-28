import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 8,
  useGrouping: true,
});

export const cdn = (path?: string, format = "png") => {
  if (process.env.NEXT_PUBLIC_CDN_URL && path) {
    return process.env.NEXT_PUBLIC_CDN_URL + path + `.${format}?alt=media`;
  } else return "";
};
