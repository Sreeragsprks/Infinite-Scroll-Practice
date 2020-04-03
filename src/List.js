import React from "react";
import ListItem from "./ListItem";

// const THRESHOLD = 15;
export default class List extends React.Component {
  THRESHOLD = 15;
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: this.THRESHOLD
    };
    this.topElement = React.createRef();
    this.bottomElement = React.createRef();
  }

  updateState = (newStart, newEnd) => {
    const { start, end } = this.state;
    if (start !== newStart || end !== newEnd) {
      this.resetObservation();
      this.setState({
        start: newStart,
        end: newEnd
      });
    }
  };

  getReference = (index, isLastIndex) => {
    return index !== isLastIndex
      ? index === 0
        ? this.topElement
        : null
      : this.bottomElement;
  };

  render() {
    const { list, height } = this.props;
    const { start, end } = this.state;
    const updatedList = list.slice(start, end);
    const lastIndex = updatedList.length - 1;

    const listItem = updatedList.map((data, index) => {
      const top = height * (start + index) + "px";
      const refVal = this.getReference(index, index === lastIndex);
      const id = index === 0 ? "top" : index === lastIndex ? "bottom" : "";
      return <ListItem data={data} top={top} refVal={refVal} id={id} />;
    });
    return (
      <div id="list-container">
        <ul>{listItem}</ul>
      </div>
    );
  }
}
