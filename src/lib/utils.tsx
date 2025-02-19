import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// `clsx`로 클래스를 조합하고, `twMerge`로 Tailwind 중복 클래스 제거
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}
