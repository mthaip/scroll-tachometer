/**
 * calc scroll velocity
 *
 * @param scrollData
 * @returns velocity
 * */
export const getVelocityByScrollData = ({
  lastPos,
  currentPos,
  timeStart,
  timeEnd,
}) => {
  const duration = timeEnd - timeStart;
  const distance = currentPos - lastPos;

  if (duration <= 0 || distance <= 0) return 0;

  return Math.floor(distance / duration);
};

// Constants
export const SCROLL_TIMER_DELAY = 100;
export const INDICATOR_COUNT = 50;
