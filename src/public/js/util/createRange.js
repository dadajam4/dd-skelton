export default function createRange(length) {
  return [...Array.from({ length }, (v, k) => k)]
}
