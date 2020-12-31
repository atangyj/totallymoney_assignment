import React from 'react';

import './Board.scss';

const Board = ({ title, children, className, action }) => (
  <div className={`board ${className}`}>
    <h2 className="board__title">{title}</h2>
    <div className="board__content">{children}</div>
    {action && <div className="board__action">{action}</div>}
  </div>
);

export default Board;
