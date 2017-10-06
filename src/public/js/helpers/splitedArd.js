export default value => {
  const tmp = value.match(/(\d{4})(\d{2})(\d{2})$/);
  return [tmp[1], tmp[2], tmp[3]].join('/');
}