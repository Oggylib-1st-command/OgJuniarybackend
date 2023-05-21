import React from "react";
import "./QrPopUp.scss";
import GeneratorQr from "../../../components/Generator-qr/generator";
import getImageKey from "../../../components/getImageKey";

function QrPop(props) {
  const someHandler = (event) => {
    event.stopPropagation();
  };
  return (
    <div
      className={!props.isActive ? "QrPop__bg" : "QrPop__bg QrPop--active"}
      onClick={props.handleClose}
    >
      <div
        className={!props.isActive ? "QrPop" : "QrPop QrPop--active"}
        onClick={someHandler}
      >
        <img
          className="QrPop__Xclose"
          src={getImageKey("IconCloseX")}
          alt="close"
          onClick={props.handleClose}
        ></img>
        <GeneratorQr></GeneratorQr>
      </div>
    </div>
  );
}

export default QrPop;
