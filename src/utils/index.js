//for functions to calculate

export const daysLeft = (deadline) => {
  // const difference = new Date(deadline).getTime() - Date.now();
  // const remainingDays = difference / (1000 * 3600 * 24);

  // return remainingDays.toFixed(0);

  const now = new Date().getTime(); // current time in milliseconds
  const end = deadline * 1000; // deadline from contract is in seconds
  const difference = end - now;

  const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));

  return daysLeft > 0 ? daysLeft : 0;
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
