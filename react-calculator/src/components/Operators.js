import React, { Component } from "react";
import Operator from "../elements/Operator";
import { add, sub, mul, div } from "../utils/operations";
import { OPERATORS, ERROR_MESSAGE } from "../constants";

export default class Operators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operators: OPERATORS,
      operator: "",
    };
  }

  onClickOperator = (operator) => {
    if (operator !== "=") {
      if (this.props.isNumberStep && this.props.recordNumber !== 0) {
        alert(ERROR_MESSAGE.OVER_INPUT_NUMBER_COUNT);
        return;
      }
      this.props.setStep(false);
      this.props.setRecordNumber(this.props.screenNumber);
      this.setState({ operator });
      return;
    }

    this.props.setStep(false);
    this.props.setRecordNumber(0);
    this.setState({ operator: "" });

    let result = 0;

    switch (this.state.operator) {
      case "+":
        result = add(this.props.recordNumber, this.props.screenNumber);
        break;
      case "-":
        result = sub(this.props.recordNumber, this.props.screenNumber);
        break;
      case "X":
        result = mul(this.props.recordNumber, this.props.screenNumber);
        break;
      case "/":
        result = div(this.props.recordNumber, this.props.screenNumber);
        break;
      default:
        break;
    }

    if (!isFinite(result)) result = ERROR_MESSAGE.INFINITE_NUMBER;
    this.props.setScreenNumber(result);
  };

  render() {
    return (
      <div className="operations subgrid">
        {this.state.operators.map((operator, index) => (
          <Operator
            onClickOperator={this.onClickOperator}
            operator={operator}
            key={index}
          />
        ))}
      </div>
    );
  }
}
