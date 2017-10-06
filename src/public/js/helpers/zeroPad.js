export default (value, digits) => {
  return ('0'.repeat(digits) + String(value)).slice(-digits);
}