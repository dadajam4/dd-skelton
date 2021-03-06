import { isBefore, isEqual } from 'date-fns';
import { parseDate as parse } from '../../../util/date';

export default (value, [otherValue, inclusion, format]) => {
  if (typeof format === 'undefined') {
    format = inclusion;
    inclusion = false;
  }
  value = parse(value, format);
  otherValue = parse(otherValue, format);

  // if either is not valid.
  if (!value || !otherValue) {
    return false;
  }

  return isBefore(value, otherValue) || (inclusion && isEqual(value, otherValue));
};
