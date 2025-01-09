//  const onDateChangeData = useCallback((date: any, type: any) => {
//     const newDate = JSON.stringify(date);
//     const newDate1 = newDate.substring(1, newDate.length - 1);
//     const dates = newDate1.split("T");
//     const date1 = dates[0].split("-");
//     const day = date1[2];
//     const month = date1[1];
//     const year = date1[0];

//     if (type == "END_DATE") {
//       if (day == undefined) {
//         setSelectedEndDate("DD/MM/YYYY");
//       } else {
//         setSelectedEndDate(`${day}/${month}/${year}`);
//       }
//     } else {
//       setSelectedStartDate(`${day}/${month}/${year}`);
//       setSelectedEndDate("DD/MM/YYYY");
//     }
//   }, []);