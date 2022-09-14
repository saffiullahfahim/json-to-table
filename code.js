const arr = [
  {
    a: 1,
    b: 2,
    c: 4,
    d: 5,
    e: 6,
  },
  {
    a: 10,
    b: 20,
    c: 40,
    d: 50,
    e: 60,
  },
  {
    a: 11,
    b: 22,
    c: 44,
    d: 55,
    e: 66,
  },
];

const getOnlySpecificValue = (arr) => {
  const result = [];
  for (let x of arr) {
    let obj = {};
    for (let key in x) {
      if (key == "a" || key == "b" || key == "c") {
        obj[key] = x[key];
      }
    }
    if (Object.values(arr).length) {
      result.push(obj);
    }
  }

  return result;
};

let test = getOnlySpecificValue(arr); // result fuction

console.log(test); // print result  on console

document.write(JSON.stringify(test)); // print result on document
