import { parseDate as parse } from '../../../util/date';

export default (value, [format]) => {
  return !!parse(value, format);
};
