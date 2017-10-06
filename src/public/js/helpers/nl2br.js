export default (value, trim = false) => {
  value = String(value);
  if (trim) value = value.trim();
  return String(value).replace(/\n/g, '<br>');
}