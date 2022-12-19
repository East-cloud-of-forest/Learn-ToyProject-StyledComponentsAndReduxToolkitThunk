export default function MaxLength(str, max) {
  if (!str || !max) return
  if (str.length >= max) {
    str = str.slice(0, max)
  }
  return str
}
