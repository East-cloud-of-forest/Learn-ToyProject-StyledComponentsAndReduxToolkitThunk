export default function useMaxLength() {
  const maxLength = (str, max) => {
    if (!str || !max) return
    if (str.length >= max) {
      str = str.slice(0, max)
    }
    return str
  }
  return [maxLength]
}
