const getInitials = (name: string) => {
  return name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
};

export default getInitials;
