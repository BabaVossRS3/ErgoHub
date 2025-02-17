import { greekAreas } from './../data/greekAreas';

export const getLocationWithParent = (areaName) => {
  for (const region of greekAreas) {
    for (const subArea of region.subAreas) {
      if (subArea.areas.includes(areaName)) {
        return {
          area: areaName,
          subArea: subArea.name,
          region: region.name
        };
      }
    }
  }
  return {
    area: areaName,
    subArea: null,
    region: null
  };
};