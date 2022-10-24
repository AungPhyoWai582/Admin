export const catchHotLimit = (num, hots, masterTotalData, call, hotLimit) => {
  console.log(Array.from(call).length);
  let obj = {
    hotLimit: hotLimit,
  };
  if (masterTotalData.Data.lenght !== 0) {
    if (
      masterTotalData.Data.map((d) => d.number.toString()).includes(
        num.number.toString()
      )
    ) {
      const callTotal =
        Array.from(call).lenght == 0
          ? 0
          : call
              .filter((obj) => obj.number === num.number)
              .map((obj) => Number(obj.amount))
              .reduce((pre, next) => pre + next, 0);
      const hotTotal = masterTotalData.Data.find(
        (obj) => obj.number.toString() === num.number.toString()
      ).amount;
      const remainBet = hotLimit - hotTotal - callTotal;

      obj.callTotal = callTotal;
      obj.hotTotal = hotTotal;
      obj.remainBet = remainBet;
      return obj;
    } else {
      const hotTotal = 0;
      const callTotal =
        Array.from(call).lenght == 0
          ? 0
          : call
              .filter((obj) => obj.number === num.number)
              .map((obj) => Number(obj.amount))
              .reduce((pre, next) => pre + next, 0);
      const remainBet = hotLimit - hotTotal - callTotal;
      obj.callTotal = callTotal;
      obj.hotTotal = hotTotal;
      obj.remainBet = remainBet;
      return obj;
    }
  } else {
    const hotTotal = 0;
    const callTotal =
      Array.from(call).lenght == 0
        ? 0
        : call
            .filter((obj) => obj.number === num.number)
            .map((obj) => Number(obj.amount))
            .reduce((pre, next) => pre + next, 0);
    const remainBet = hotLimit - hotTotal - callTotal;
    obj.callTotal = callTotal;
    obj.hotTotal = hotTotal;
    obj.remainBet = remainBet;
    return obj;
  }
};
