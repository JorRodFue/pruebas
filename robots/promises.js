
const addOne = number => number + 1
const getExternalValue = () => Promise.resolve(10).catch(2)
getExternalValue()
    .then(addOne)
    .then(addOne)
    .then((value) => console.log(value))