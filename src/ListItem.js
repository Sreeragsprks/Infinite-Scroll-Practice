import React from "react";

const ListItem = ({ data, top, refVal, id }) => (
  <li className="list-item" style={{ top }} id={id} ref={refVal}>
    {data.value}
  </li>
);
export default ListItem;
