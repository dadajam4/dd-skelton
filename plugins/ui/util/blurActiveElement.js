export default function blurActiveElement() {
  if (document.activeElement && document.activeElement.blur) {
    document.activeElement.blur();
  }
}
