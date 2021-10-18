import { getUnixTime, subDays, subWeeks, startOfMinute } from "date-fns";

export const getTimeStamps = (): [number, number, number, number] => {
  const utcCurrentTime = getUnixTime(new Date()) * 1000;
  const t24h = getUnixTime(startOfMinute(subDays(utcCurrentTime, 1)));
  const t48h = getUnixTime(startOfMinute(subDays(utcCurrentTime, 2)));
  const t7d = getUnixTime(startOfMinute(subWeeks(utcCurrentTime, 1)));
  const t14d = getUnixTime(startOfMinute(subWeeks(utcCurrentTime, 2)));
  return [t24h, t48h, t7d, t14d];
};
