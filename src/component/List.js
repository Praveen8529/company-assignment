import { React, useState, useEffect } from "react";

const List = ({ userListSet = [], onCustomClick, key }) => {
  const handelSelection = (e) => {
    if (onCustomClick) {
      onCustomClick(e.target.id);
    }
  };
  return (
    <>
      <div className="list-container">
        <ul>
          {userListSet &&
            userListSet.map((item) => (
              <li
                key={item.id}
                id={item.id}
                onClick={handelSelection}
                className={item.selected ? "selected" : null}
              >
                {item.name}
                <span></span>
                {item.email}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default List;
