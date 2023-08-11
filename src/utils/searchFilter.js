import {SHORT_TIME} from "./constrains";

export default function searchFilter(array, searchStr, short) {
  if (!array) {
    return [];
  }

  let filtered = [...array];

  if (searchStr) {
    filtered = filtered.filter((movie) => {
      const lowerSearchStr = searchStr.toLowerCase();
      const lowerNameRU = movie.nameRU.toLowerCase();
      const lowerNameEN = movie.nameEN.toLowerCase();

      return lowerNameRU.includes(lowerSearchStr) || lowerNameEN.includes(lowerSearchStr);
    });
  }

  if (short) {
    return filtered.filter((element) => element.duration <= SHORT_TIME); // > 40 min
  }

  return filtered;
}
