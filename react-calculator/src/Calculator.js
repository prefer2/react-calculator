import React, { Component } from "react";
import ClearButton from "./components/ClearButton";
import Digits from "./components/Digits";
import Operators from "./components/Operators";
import Screen from "./components/Screen";
import { isOverMaxLength } from "./validator/index";

export default class Calculator extends Component {
  constructor() {
    super();
    const screenNumber = Number(localStorage.getItem("calculator-data"));
    this.state = { screenNumber, recordNumber: 0, isNumberStep: true };
  }

  componentDidUpdate() {
    if (this.state.screenNumber === 0) {
      localStorage.setItem("calculator-data", JSON.stringify(0));
      this.removeBeforeUnloadEvent();
      return;
    }
    this.addBeforeUnloadEvent();
  }

  setRecordNumber = (targetNumber) => {
    this.setState({ recordNumber: targetNumber });
  };

  setScreenNumber = (targetNumber) => {
    this.setState({ screenNumber: targetNumber });
  };

  setStep = (target) => {
    this.setState({ isNumberStep: target });
  };

  onClickDigit = (enteredDigit) => {
    if (!this.state.isNumberStep) {
      this.setScreenNumber(enteredDigit);
      this.setState({ isNumberStep: true });
      return;
    }
    const prevNumber = this.state.screenNumber;
    if (!isOverMaxLength(prevNumber)) {
      this.setScreenNumber(prevNumber * 10 + enteredDigit);
    }
  };

  handleBeforeUnload = (e) => {
    e.preventDefault();
    if (isFinite(this.state.screenNumber)) {
      localStorage.setItem(
        "calculator-data",
        JSON.stringify(this.state.screenNumber)
      );
    }
    e.returnValue = "";
  };

  addBeforeUnloadEvent = () => {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  };

  removeBeforeUnloadEvent = () => {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  };

  render() {
    const { screenNumber, isNumberStep, recordNumber } = this.state;
    return (
      <div className="calculator">
        <Screen screenNumber={screenNumber}></Screen>
        <Digits onClickDigit={this.onClickDigit}></Digits>
        <Operators
          setScreenNumber={this.setScreenNumber}
          screenNumber={screenNumber}
          setStep={this.setStep}
          isNumberStep={isNumberStep}
          recordNumber={recordNumber}
          setRecordNumber={this.setRecordNumber}
        ></Operators>
        <ClearButton
          setScreenNumber={this.setScreenNumber}
          setRecordNumber={this.setRecordNumber}
        ></ClearButton>
      </div>
    );
  }
}
