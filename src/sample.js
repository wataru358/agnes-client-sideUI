export const mergeSortAlt = (array) => {
    const split = (array) => {
      if (array.length < 2) {
        return array
      }
      let a, b, mid = array.length / 2 | 0;
      a = split(array.slice(0, mid));
      b = split(array.slice(mid, array.length));
      return merge(array, a, b)
    },
    merge = (array, a, b) => {
      if (b === undefined) {
        return array
      }
      let c = [], i, j;
      while (a.length > 0 && b.length > 0) {
        i = a[0], j = b[0];
        if (i < j) {
          c.push(a.shift())
        } else {
          c.push(b.shift())
        }
      }
      if (a.length === 0) {
        c = c.concat(b);
      } else if (b.length === 0) {
        c = c.concat(a);
      }
      return c;
    }
    return split(array);
}
