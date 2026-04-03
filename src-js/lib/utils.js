<<<<<<< HEAD:src-js/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
=======
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
>>>>>>> 1eed3bb41956043c2cd813d08cf28aeeaa2efc64:src/lib/utils.js
}
