export default function chunkArray(array: any[], size: number) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, size + index));
    index += size;
  }

  return chunked;
}
