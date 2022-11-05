import {css} from "@emotion/react";
import React, {Fragment, Component} from "react";

class CardFrame extends Component {
  state = {};
  render() {
    let {children, viewscreen, clientObj, simulator, station, cardName} =
      this.props;
    const {name: stationName} = station;

    return (
      <div className="card-frame">
        <div
          css={css`
            position: absolute;
            right: 0;
            bottom: -20px;
            height: 96px;
            width: max(${simulator.name.length}ch, 350px);
            font-family: "Bank Gothic";
            font-size: 50px;
            background: url(${require("./images/lr-span.png")});
          `}
        ></div>
        <div
          css={css`
            position: absolute;
            right: max(${simulator.name.length}ch, 350px);
            bottom: -20px;
            height: 96px;
            width: 130px;
            font-family: "Bank Gothic";
            font-size: 50px;
            background: url(${require("./images/lr-angle.png")});
          `}
        ></div>
        {!viewscreen && (
          <div
            css={css`
              position: absolute;
              right: 0;
              bottom: 76px;
              height: 65px;
              width: 347px;
              background: url(${require("./images/caution.png")});
            `}
          ></div>
        )}
        <div
          css={css`
            position: absolute;
            left: 0;
            top: -20px;
            height: 89px;
            font-family: "Bank Gothic";
            font-size: 50px;
            width: calc(${stationName.length}ch + 20px);
            background: url(${require("./images/tr-span.png")});
          `}
        ></div>

        {!viewscreen && (
          <div
            css={css`
              position: absolute;
              left: calc(${stationName.length}ch + 70px);
              top: 0px;
              height: 31px;
              font-family: "Bank Gothic";
              font-size: 50px;
              width: 87px;
              background: url(${require("./images/tidbit.png")});
            `}
          ></div>
        )}
        <div
          css={css`
            position: absolute;
            left: calc(${stationName.length}ch + 20px);
            top: -20px;
            height: 89px;
            font-family: "Bank Gothic";
            font-size: 50px;
            width: 112px;
            background: url(${require("./images/tr-angle.png")});
          `}
        ></div>
        {!viewscreen && (
          <Fragment>
            <div
              css={css`
                position: absolute;
                left: calc(${stationName.length}ch + 80px);
                top: -20px;
                height: 89px;
                font-family: "Bank Gothic";
                font-size: 50px;
                width: 106px;
                background: url(${require("./images/card-l.png")});
              `}
            ></div>
            <div
              css={css`
                position: absolute;
                left: calc(${stationName.length}ch + 186px);
                top: -20px;
                height: 89px;
                font-family: "Bank Gothic";
                font-size: 50px;
                width: calc(${cardName.length}ch - 20px);
                background: url(${require("./images/card-span.png")});
              `}
            ></div>
            <div
              css={css`
                position: absolute;
                left: calc(
                  ${stationName.length}ch + 186px + ${cardName.length}ch - 20px
                );
                top: -20px;
                height: 89px;
                font-family: "Bank Gothic";
                font-size: 50px;
                width: 99px;
                background: url(${require("./images/card-r.png")});
              `}
            ></div>
            <div
              css={css`
                position: absolute;
                left: -20px;
                top: 69px;
                height: calc(84px * ${station.cards.length});
                width: 105px;
                background: url(${require("./images/l-span.png")});
              `}
            ></div>
            <div
              css={css`
                position: absolute;
                left: -20px;
                top: calc(69px + 84px * ${station.cards.length});
                height: 116px;
                width: 105px;
                background: url(${require("./images/l-angle.png")});
              `}
            ></div>
          </Fragment>
        )}
        <div
          className="card-area"
          style={{zIndex: viewscreen && !clientObj.overlay ? 1000 : 1}}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default CardFrame;
