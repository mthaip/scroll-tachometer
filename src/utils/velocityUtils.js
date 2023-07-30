/**
 * calc how fast should it scroll back to top
 *
 * @param scrollTop current scroll top position
 * @returns delta
 * */
export const getScrollBackDelatByScrollTop = (scrollTop) => {
  if (scrollTop > 100 && scrollTop < 500) {
    return 100;
  }

  if (scrollTop > 500 && scrollTop < 1000) {
    return 200;
  }

  if (scrollTop > 1000 && scrollTop < 10000) {
    return 500;
  }

  if (scrollTop > 10000) {
    return 1500;
  }

  return 10;
};

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
export const SCROLL_TO_TOP_DELAY = 100;
export const INDICATOR_COUNT = 50;
