const MEDIA_TARGET = 'all';
const BREAK_POINTS = {
  xs: null, // Phone (Narrow)
  sm: 576,  // Phone
  md: 768,  // Tablet
  lg: 992,  // Desktop
  xl: 1200, // Desktop (Wide)
};

const GROUPS = {
  mobile : {max: 'md'},
  desktop: {min: 'lg'},
};

let breakPoints = [];

for (const key in BREAK_POINTS) {
  breakPoints.push({
    key: key,
    min: BREAK_POINTS[key],
  });
}

breakPoints = breakPoints.sort((a, b) => { return (!b.min || a.min > b.min) });
breakPoints.forEach((row, index) => {
  const prev = breakPoints[index - 1];
  const next = breakPoints[index + 1];

  if (prev) {
    row.prev = prev.key;
  }

  if (next) {
    row.next = next.key;
    row.max  = next.min - 1;
  }
});



module.exports = {
  target     : MEDIA_TARGET,
  groups     : GROUPS,
  breakPoints: breakPoints,
};
