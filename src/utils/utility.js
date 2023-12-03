export const getDate = () => {
  const date = new Date();

  const currentDate = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return currentDate;
};
