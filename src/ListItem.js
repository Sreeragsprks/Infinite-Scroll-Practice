import React from "react";

const ListItem = ({ data, top, refVal, id }) => (
  <li className="list-item" style={{ top }} id={id} ref={refVal}>
    {data}
    {/* <img src={data} alt='' height='100px' width='200px'/> */}
  </li>
);
export default ListItem;
