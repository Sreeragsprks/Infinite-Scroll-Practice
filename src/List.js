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

  componentDidMount = () => this.initiateScrollObserver();

  componentDidUpdate = (prevProps, prevState) => {
    let { start, end } = this.state;
    if (prevState.start !== start || prevState.end !== end) {
      this.initiateScrollObserver();
    }
  };

  initiateScrollObserver = () => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.01
    };
    this.observer = new IntersectionObserver(this.callBack, options);
    if (this.topElement.current) this.observer.observe(this.topElement.current);
    if (this.bottomElement.current)
      this.observer.observe(this.bottomElement.current);
  };

  callBack = (entries, observer) => {
    entries.forEach((entry, index) => {
      const listLength = this.props.list.length;
      const { start, end } = this.state;
      // Scroll Down
      // We make increments and decrements in 10s
      if (entry.isIntersecting && entry.target.id === "bottom") {
        const maxStartIndex = listLength - 1 - this.THRESHOLD; // Maximum index value `start` can take
        const maxEndIndex = listLength - 1; // Maximum index value `end` can take
        const newEnd = end + 10 <= maxEndIndex ? end + 10 : maxEndIndex;
        const newStart = end - 5 <= maxStartIndex ? end - 5 : maxStartIndex;
        this.updateState(newStart, newEnd);
      }
      // Scroll up
      if (entry.isIntersecting && entry.target.id === "top") {
        const newEnd =
          end === this.THRESHOLD
            ? this.THRESHOLD
            : end - 10 > this.THRESHOLD
            ? end - 10
            : this.THRESHOLD;
        let newStart = start === 0 ? 0 : start - 10 > 0 ? start - 10 : 0;
        this.updateState(newStart, newEnd);
      }
    });
  };

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

  resetObservation = () => {
    this.observer.unobserve(this.bottomElement.current);
    this.observer.unobserve(this.topElement.current);
    this.bottomElement = React.createRef();
    this.topElement = React.createRef();
  };

  getReference = (index, isLastIndex) => {
    if (index === 0) return this.topElement; // Attach this ref for first element
    if (isLastIndex) return this.bottomElement; // Attach this ref for last element
    return null;
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
      return (
        <ListItem
          key={data.key}
          data={data.value}
          top={top}
          refVal={refVal}
          id={id}
        />
      );
    });
    return (
      <div id="list-container">
        <ul>{listItem}</ul>
      </div>
    );
  }
}
