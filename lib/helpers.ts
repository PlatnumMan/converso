import readingTime from "reading-time";
import { DateTime } from "luxon";

export const getReadingTime = (text: string, locale: string) => {
  const minutes = readingTime(text).minutes;
  // Floor to 1 decimal place
  const minutesRounded = Math.floor(minutes);
  if (locale === "fr") {
    if (minutesRounded === 1) {
      return `${minutes} min`;
    } else {
      return `${minutesRounded} mins`;
    }
  } else {
    if (minutesRounded === 1) {
      return `${minutes} min`;
    } else {
      return `${minutesRounded} mins`;
    }
  }
};

export const getRelativeDate = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};
