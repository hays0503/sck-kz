import { Specification } from "@/shared/types/specification";

let cachedSpecif: Specification[] | null = null;

export function setSpecifCache(values: Specification[]) {
  cachedSpecif = values;
}

export function getSpecifCache() {
  return cachedSpecif;
}
