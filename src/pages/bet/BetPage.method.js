export const calculateHotTee = (user, hot_tees, numbers, totalAmount) => {
  const hots = hot_tees.split("/");
  const arr = [];
  // const {totalAmount,numbers}=lagerIn;
  console.log(user);
  console.log(hots, totalAmount, numbers);
  console.log(user);

  hots.map((h) => {
    let amount;
    if (numbers.map((n) => n.number).includes(h)) {
      console.log(true)
      amount =
        Number((totalAmount * user.hot_limit) / 100) -
        Number(numbers[numbers.findIndex((obj) => obj.number === h)].amount);
        // console.log(numbers[numbers.findIndex(obj=>obj.number===h)].amount)
    }else{
      amount = totalAmount * (user.hot_limit / 100);
    }
    console.log(amount)
    // amount = numbers[numbers.findIndex((obj) => obj.number === h)].amount;

    arr.push({ number: h, amount: amount });
  });
  return arr;
};
