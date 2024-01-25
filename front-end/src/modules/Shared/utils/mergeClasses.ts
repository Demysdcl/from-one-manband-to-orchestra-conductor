import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cd = (...classes: ClassValue[]) => twMerge(clsx(classes))
