export const calculateHotTee = (onchange,hot,user, masterTotalData) => {
 const hotlimit = ( masterTotalData.Total * user.hot_limit/100);

const hotTotalbet = masterTotalData.Data.filter(msd=>msd.number===onchange.number);
//  const remain = (hotlimit -hotTotalbet);
//  console.log(remain)
//  return remain
};
