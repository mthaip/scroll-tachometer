import React, { useRef, useEffect, useState } from 'react';
import { Tachometer } from './Tachometer';
import { SCROLL_TIMER_DELAY } from './utils/velocityUtils';

export const App = () => {
  const scrollableDivRef = useRef(null);
  const expandableDivRef = useRef(null);
  const triggerRef = useRef(null);

  var scrollTimer = null;

  const [scrollData, setScrollData] = useState({
    lastPos: 0,
    currentPos: 0,
    timeStart: Date.now(),
    timeEnd: Date.now(),
  });

  const expandHeight = () => {
    const { current: expandable = null } = expandableDivRef;
    if (!expandable) return;

    const expandableClientHeight = expandable.clientHeight;
    scrollableDivRef.current.scrollTo(0, expandableClientHeight);

    // expand height of div
    expandable.style.minHeight = expandableClientHeight * 2 + 'px';
  };

  const handleScroll = () => {
    const { current: scrollableDiv = null } = scrollableDivRef;
    if (!scrollableDiv) return;

    setScrollData((prev) => {
      const currentScrollTop = scrollableDiv.scrollTop;

      // reset scroll data if it is scrolling up
      if (currentScrollTop < prev.currentPos) {
        return {
          lastPos: currentScrollTop,
          currentPos: currentScrollTop,
          timeStart: Date.now(),
          timeEnd: Date.now(),
        };
      }

      // otherwise, it is scrolling down. Update current position and time end
      return {
        ...prev,
        currentPos: currentScrollTop,
        timeEnd: Date.now(),
      };
    });

    // clear timeout if div reached top
    if (scrollTimer || scrollableDiv.scrollTop == 0) {
      clearTimeout(scrollTimer);
    }

    // reset scroll data if it stops scrolling
    scrollTimer = setTimeout(() => {
      setScrollData((prev) => ({
        ...prev,
        lastPos: scrollableDiv.scrollTop,
        timeStart: Date.now(),
        timeEnd: Date.now(),
      }));
    }, SCROLL_TIMER_DELAY);
  };

  useEffect(() => {
    const { current: trigger = null } = triggerRef;
    const { current: expandable = null } = expandableDivRef;
    const { current: scrolllable = null } = scrollableDivRef;

    if (!trigger || !expandable || !scrolllable) return;

    expandable.style.minHeight = document.body.clientHeight + 'px';

    scrolllable.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        // expand div height if trigger reached view port
        if (entries[0].isIntersecting) {
          expandHeight();
        }
      },
      {
        root: scrolllable,
      },
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      scrolllable.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={scrollableDivRef} className="container">
      <div ref={expandableDivRef} className="expandable" />
      <div ref={triggerRef} className="trigger" />
      <div className="tachometer-conatainer">
        <Tachometer data={scrollData} />
        <h3>👇 SCROLL DOWN 👇</h3>
      </div>
    </div>
  );
};
