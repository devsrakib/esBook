const FormatDate = (isoString: Date) => {
  // const date = new Date(isoString);
  // return date.toLocaleString("en-US", {
  //   year: "2-digit",
  //   day: "2-digit",
  //   month: "2-digit",
  //   // hour: '2-digit',
  //   // minute: '2-digit',
  //   // second: '2-digit'
  // });

  const newDate = JSON.stringify(isoString);
  const newDate1 = newDate.substring(1, newDate.length - 1);
  const dates = newDate1.split("T");
  const date1 = dates[0].split("-");
  const day = date1[2];
  const month = date1[1];
  const year = date1[0];
  return day + "/" + month + "/" + year;
};

export default FormatDate;
