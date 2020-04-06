import React from "react";

const ListItem = ({ data, top, refVal, id }) => (
  <li className="list-item" style={{ top }} id={id} ref={refVal}>
    {data}
  </li>
);
export default ListItem;
