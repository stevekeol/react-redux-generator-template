/*
 * @file component Item
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

function ListItem({ item, onClick }) {
  let formatTime = '未知时间';
  if (item.time) {
    formatTime = new Date(item.time).toISOString().match(/(\d{4}-\d{2}-\d{2})/)[1];
  }
  const liClass = classNames({
    'list-group-item d-flex justify-content-between align-items-center item-component': true,
    active: false,
  });
  const spanClass = classNames({
    'badge badge-pill': true,
    'badge-secondary': true,
    'badge-light': false,
  });
  return (
    <a
      href="#"
      className={liClass}
      onClick={onClick}
    >
      {item.title}
      <span className={spanClass}>
      {formatTime}
      </span>
    </a>
  );
}

ListItem.propTypes = propTypes;

export default ListItem;
