// Solution 1

function isAnagram(strOne, strTwo) {
  const wordOne = strOne.toLowerCase().trim();
  const wordTwo = strTwo.toLowerCase().trim();

  if (wordOne.length !== wordTwo.length) {
    return false;
  }

  for (let i = 0; i < wordOne.length; i++) {
    let counter1 = 0;
    let counter2 = 0;
    let letterOne = wordOne[i];

    for (let j = 0; j < wordOne.length; j++) {
      let letterTwo = wordOne[j];

      if (letterOne === letterTwo) {
        counter1 += 1;
      }

      letterTwo = wordTwo[j];

      if (letterOne === letterTwo) {
        counter2 += 1;
      }
    }

    if (counter1 !== counter2) {
      return false;
    }
  }

  return true;
}

// Solution 2

function isAnagram2(strOne, strTwo) {
  const wordOne = strOne.toLowerCase().trim();
  const wordTwo = strTwo.toLowerCase().trim();

  if (wordOne.length !== wordTwo.length) {
    return false;
  }

  const arr = [...wordTwo.split("")];

  for (let i = 0; i < wordOne.length; i++) {
    const letter = wordOne[i];

    if (arr.includes(letter)) {
      const index = arr.indexOf(letter);

      if (index !== -1) {
        arr.splice(index, 1);
      }
    }
  }

  if (arr.length === 0) {
    return true;
  } else {
    return false;
  }
}
