const FormatDate = (isoString:Date) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: '2-digit',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
export default FormatDate;