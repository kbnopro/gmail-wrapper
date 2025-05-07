const MediumDateWithoutYear = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
});

const MediumDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

const ShortTime = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
});

export const getDisplayedDate = (date: Date) => {
  const now = new Date(Date.now());
  if (date.getFullYear() == now.getFullYear()) {
    if (date.getMonth() == now.getMonth() && date.getDate() == now.getDate()) {
      return ShortTime.format(date);
    }
    return MediumDateWithoutYear.format(date);
  }
  return MediumDate.format(date);
};
