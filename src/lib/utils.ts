import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Format a date string using date-fns with predefined format options
 * @param {string} dateString - ISO date string (e.g., "2023-11-15T00:00:00.000Z")
 * @param {string} formatType - Format option: 'short', 'medium', or 'long'
 * @returns {string} Formatted date string
 */

type FormatType = 'short' | 'medium' | 'long';

export function formatDate(dateString: string, formatType: FormatType = 'medium'): string {
  if (!dateString) return '';

  try {
    const date = parseISO(dateString);

    const formats = {
      short: 'MM/dd/yyyy',           // 11/15/2023
      medium: 'MMM dd, yyyy',        // Nov 15, 2023
      long: 'MMMM dd, yyyy'          // November 15, 2023
    };

    const formatPattern = formats[formatType] || formats.medium;
    return format(date, formatPattern);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if formatting fails
  }
};