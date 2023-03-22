export const changeDate = (date) => {
  const arrDate = date.split(`-`)
  return `${arrDate[1]}-${arrDate[2]}-${arrDate[0]}`
} 

export const reChangeDate = (date) => {
  console.log(date)
  const arrDate = date?.split(`-`)
  console.log(arrDate)
  return `${arrDate[2]}-0${getMonthNumber(arrDate[1].toLowerCase())}-${arrDate[0]}`
} 

export function getMonthNumber(monthName) {
  let monthNumber = null;
  
  switch (monthName.toLowerCase()) {
    case "january":
      monthNumber = 1;
      break;
    case "february":
      monthNumber = 2;
      break;
    case "march":
      monthNumber = 3;
      break;
    case "april":
      monthNumber = 4;
      break;
    case "may":
      monthNumber = 5;
      break;
    case "june":
      monthNumber = 6;
      break;
    case "july":
      monthNumber = 7;
      break;
    case "august":
      monthNumber = 8;
      break;
    case "september":
      monthNumber = 9;
      break;
    case "october":
      monthNumber = 10;
      break;
    case "november":
      monthNumber = 11;
      break;
    case "december":
      monthNumber = 12;
      break;
    default:
      // jika nama bulan tidak dikenali, tidak ada perubahan pada monthNumber
      break;
  }
  
  return monthNumber;
}


