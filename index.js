const timeData = [
  [60000, 1000, "sec"],
  [3600000, 60000, "min"],
  [86400000, 3600000, "hour"],
  [604800000, 86400000, "day"],
  [2628000000, 604800000, "week"],
  [31536000000, 2628000000, "month"],
  [Infinity, 31536000000, "year"],
];

function parse(date) {
  return typeof date === "number" ? date : Date.parse(date);
}

export function timerel(date, ref = Date.now(), {noAffix = false, timeTable = timeData} = {}) {
  date = parse(date);
  ref = parse(ref);

  if (Number.isNaN(date) || Number.isNaN(ref)) return "unknown";

  const diff = Math.abs(ref - date);
  if (diff < 10000) return "now";

  let num, suffix;
  for (let i = 0; i <= timeTable.length; i++) {
    if (diff >= timeTable[i][0]) continue;
    const [_, start, unit] = timeTable[i];
    num = Math.floor(diff / start);
    suffix = `${unit}${num > 1 ? "s" : ""}`;
    break;
  }

  const future = date > ref;
  const before = future ? (noAffix ? "" : "in ") : "";
  const after = !future ? (noAffix ? "" : " ago") : "";
  return `${before}${num} ${suffix}${after}`;
}
