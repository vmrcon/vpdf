import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Escape plain text to safe HTML
export function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Convert plain text to HTML for safe rendering in contentEditable
export function textToHtml(str: string) {
  if (!str && str !== '') return '';
  return escapeHtml(str).replace(/\r\n|\r|\n/g, '<br>');
}
