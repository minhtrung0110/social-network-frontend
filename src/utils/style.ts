import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// @ts-ignore
import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}