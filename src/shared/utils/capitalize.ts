export function capitalize(str: string): string {
  try {
    if (!str) return str;

  const string = str.toString()

  return string
    .split(' ')
    .map(word => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
  } catch(e){
    return str
  }
}
