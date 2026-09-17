import { Observable, of } from 'rxjs';

export const complement = (u: number[], a: number[]): number[] => {
  const x: number[] = [];

  u.forEach(ui => {
    if (!a.includes(ui) && !x.includes(ui)) {
      x.push(ui);
    }
  });

  return x;
},

divisors = (a: number): number[] => {
  const divs: number[] = [];

  if (a < 1) {
    return divs;
  }

  divs.push(1);

  for (let i = 2; i <= a; i++) {
    if (a % i === 0) {
      divs.push(i);
    }
  }

  return divs;
},

divisorsAsync = (a: number): Observable<number[]> => {
    const divs: number[] = [];

    if (a < 1) {
      return of(divs);
    }

    divs.push(1);

    for (let i = 2; i <= a; i++) {
      if (a % i === 0) {
        divs.push(i);
      }
    }

    return of(divs);
},

expansion = (x: number, base: number): number[] => {
  const digits: number[] = [];
  let quotient = 0, dividend = x, remainder = 0;

  do {
    quotient = Math.floor(dividend / base);
    remainder = dividend % base;
    dividend = quotient;
    digits.push(remainder);
  } while (quotient > 0);

  return digits;
},

intersection = (a: number[], b: number[]): number[] => {
  const aub: number[] = [];

  a.forEach(ai => {
    b.forEach(bi => {
      if (ai === bi && !aub.includes(ai)) {
        aub.push(ai);
      }
    });
  });

  return aub;
},

isDivisorOf = (a: number, b: number): boolean => {
  if (a > b) {
    return false;
  }

  const quotient = b / a;
  return (b % (a * quotient)) === 0;
},

isEven = (x: number): boolean => {
  return x % 2 === 0;
},

isMultipleOf = (a: number, b: number): boolean => {
  if (a > b) {
    return false;
  }

  const multiplier = b / a;
  return (b - (a * multiplier)) === 0;
},

isOdd = (x: number): boolean => {
  return x % 2 !== 0;
},

isPrime = (x: number|number[]): boolean => {
  if (typeof x === 'number') {
    return divisors(x).length === 2;
  } else {
    return x.length === 2
  }
},

isRelativePrimeOf = (a: number|number[], b: number): boolean => {
  return maximalCommonDivisor(a, b) === 1;
},

maximalCommonDivisor = (a: number|number[], b: number): number => {
  const aDivisors = typeof a === 'number' ? divisors(a) : a,
      bDivisors = divisors(b),
      commonDivisors: number[] = [];

  aDivisors.forEach(aDiv => {
    bDivisors.forEach(bDiv => {
      if (aDiv === bDiv) {
        commonDivisors.push(aDiv);
      }
    });
  });

  return commonDivisors.length > 0 ? commonDivisors[commonDivisors.length - 1] : 0;
},

parseSet = (set: string[]): any[] => {
  const setParsed: any[] = [];

  set.forEach(item => {
    let itemParsed = parseFloat(item.trim());

    if (isNaN(itemParsed)) {
      itemParsed = parseInt(item);
    }

    setParsed.push(isNaN(itemParsed) ? item : itemParsed);
  });

  return setParsed;
},

primesSet = (divisors: number[]): number[][] => {
  const prime = Math.max(...divisors);

  if (divisors.length === 0 || divisors.length === 1 || prime ===1) {
    return [];
  }

  if (divisors.length === 2) {
    return [[1, prime], [prime, 1]];
  }

  const primes: number[][] = [];
  let divs: number[] = [];

  console.clear();

  [...divisors].reverse().forEach(div => {
    let quotient = prime / div,
        remainder = prime % div;

    if ((quotient === 1 || quotient === prime) && remainder === 0) {
      primes.push([quotient, div]);
    } else {
      while (quotient !== 1) {
        divs.push(div);

        [...divisors].reverse().forEach(innerDiv => {
          if (quotient > 1 && innerDiv <= quotient) {
            let innerQuotient = quotient / innerDiv,
                innerRemainder = quotient % innerDiv;

            if (innerQuotient === 1 && innerRemainder === 0) {
              divs.push(innerDiv)
              primes.push(divs);
              divs = [];
              quotient = innerQuotient;
            }
          }
        });
      }
    }
  });

  return primes;
},

union = (setA: any[], setB: any[]): any[] => {
  const aub: any[] = [];

  setA.forEach(aItem => {
    if (!aub.includes(aItem)) {
      aub.push(aItem);
    }
  });

  setB.forEach(bItem => {
    if (!aub.includes(bItem)) {
      aub.push(bItem);
    }
  });

  return aub;
};

