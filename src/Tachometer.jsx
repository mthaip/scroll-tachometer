import React from 'react';
import {
  INDICATOR_COUNT,
  getVelocityByScrollData,
} from './utils/velocityUtils';

export const Tachometer = (props) => {
  const velocity = getVelocityByScrollData(props.data);

  const renderIndicators = () => {
    const percent = Math.floor(100 * (velocity / INDICATOR_COUNT));

    return [...Array(INDICATOR_COUNT).keys()].map((index) => {
      const className = index < percent ? 'highlighted' : '';

      return (
        <i
          key={`indicator-${index}`}
          style={{ '--i': index }}
          className={className}
        ></i>
      );
    });
  };

  return (
    <div className="tachometer">
      {renderIndicators()}
      <div className="highlighted velocity">
        <span>{velocity}</span>
        <span className="unit">px / ms</span>
      </div>
    </div>
  );
};
