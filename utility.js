

module.exports.getHHMMSS = sec_num => {
  let hours   = Math.floor(sec_num / 3600) % 24;
  let minutes = Math.floor(sec_num / 60) % 60;
  let seconds = sec_num % 60;
  return [hours,minutes,seconds]
    .map(v => v < 10 ? "0" + v : v)
    .filter((v,i) => v !== "00" || i > 0)
    .join(":");
}
