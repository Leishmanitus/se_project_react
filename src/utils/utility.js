export function getDate() {
  const date = new Date();

  const currentDate = date.toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const hours = date.getHours();
  const isNight = hours > 19 || hours < 6;

  return { currentDate, isNight };
}
