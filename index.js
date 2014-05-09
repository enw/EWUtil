/*
module.exports = {
  list:list,
  multN: multN,
  filter: filter,
  sum: sum,
  map: map
}
*/
// generate multiplier function
function multN(n) {return function(m) { return !(m % n)}}

// create list
function list(length) {
  var l=[];
  for (var i=0;i<length;i++) {
    l.push(i);
  }
  return l;
}

function filter(list, fn) {
  var l=[];
  for (var i=0;i<list.length;i++) {
    if (fn(list[i])) l.push(list[i]);
  }
  return l;
};

function map(list, fn) {
  var l=[];
  for (var i=0;i<list.length;i++) {
    l.push(fn(list[i]));
  }
  return l;
}
function sum(list) {
  var s=0;
  for (var i=0;i<list.length;i++) {
    s+=list[i];
  }
  return s;
}

function mult(list) {
  var s=1;
  for (var i=0;i<list.length;i++) {
    s*=list[i];
  }
  return s;
}

// test of primality
function isPrime(n, listOfPrimes) {
  // console.log(n);
  // if list of primes not passed in then fake it
  for (var i=0;i<listOfPrimes.length; i++) {
    if (!(n%listOfPrimes[i])) {
      return false;
    }
  }
  return true;
}

// generate primes up to N
// yeah, it'd be good to memoize this.  :)
function primes(n) {
  //  console.log('primes', n)
  if (n==2) {
    return [2];
  } else {
    var rest = primes(n-1);
    if (isPrime(n, rest)) {
      rest.push(n);
    }
    return rest;
  }
}

// generate composities up to N
function composites(n) {
  // generate primes
  var plist = primes(n),
    primehash = {},
    composites = [];

  // make hash for quick check
  for (var i=0;i<plist.length;i++) primehash[plist[i]]=true;

  // make composites (really the NOT of the set of numbers)
  for (var i=3;i<=n;i++) {
    if (!primehash[i]) composites.push(i);
  }

  return composites;
}

// is A divisible by B?
function isDivisibleBy(a,b) {
  return !(a%b);
}

// inefficient(?) way to get a primeFactor
// returns -1 if number is prime
function getAFactor(n, startingAt) {
  if (!startingAt) startingAt=2;
  for (var i=startingAt; i < n; i++) {
    if (!(n%i)) {
      return i;
    }
  }
  return -1
}

// returns list of factors of a number
function factorize(n) {
  var factor = getAFactor(n);
  if (factor == -1) {
    return [n];
  } else {
    var factor = getAFactor(n),
      newN = n / factor,
      factors = factorize(newN);
    factors.push(factor);
    return factors;
  }
  // get a factor
  // divide bignum by factor
  // recurse
}

// get map of factors, number of times factor appears in factors
function factorMap(num) {
  var factors = factorize(num),
    map = {};
  for (var i=0;i<factors.length;i++) {
    var factor = factors[i];
    if (map[factor]) {
      // console.log('incr',i,map);
      map[factor]++;
    } else {
      // console.log('new',i,map)
      map[factor]=1;
    }
  }
  return map;
}

module.exports = {
  list:list,
  multN: multN,
  filter: filter,
  sum: sum,
  mult: mult,
  isPrime: isPrime,
  primes: primes,
  composites: composites,
  isDivisibleBy: isDivisibleBy,
  getAFactor: getAFactor,
  factor: factorize,
  factorMap: factorMap,
  map:map
}
