import {css} from "@emotion/react";
import React, {Fragment, Component} from "react";

import lrspan from "./images/lr-span.png";
import lrangle from "./images/lr-angle.png";
import caution from "./images/caution.png";
import trspan from "./images/tr-span.png";
import tidbit from "./images/tidbit.png";
import trangle from "./images/tr-angle.png";
import cardl from "./images/card-l.png";
import cardspan from "./images/card-span.png";
import cardr from "./images/card-r.png";
import lspan from "./images/l-span.png";
import langle from "./images/l-angle.png";

const images = {
  "lr-span": lrspan,
  "lr-angle": lrangle,
  caution: caution,
  "tr-span": trspan,
  tidbit: tidbit,
  "tr-angle": trangle,
  "card-l": cardl,
  "card-span": cardspan,
  "card-r": cardr,
  "l-span": lspan,
  "l-angle": langle,
};
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
            background: url(${images["lr-span"]});
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
            background: url(${images["lr-angle"]});
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
              background: url(${images["caution"]});
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
            background: url(${images["tr-span"]});
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
              background: url(${images["tidbit"]});
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
            background: url(${images["tr-angle"]});
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
                background: url(${images["card-l"]});
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
                background: url(${images["card-span"]});
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
                background: url(${images["card-r"]});
              `}
            ></div>
            <div
              css={css`
                position: absolute;
                left: -20px;
                top: 69px;
                height: calc(84px * ${station.cards.length});
                width: 105px;
                background: url(${images["l-span"]});
              `}
            ></div>
            <div
              css={css`
                position: absolute;
                left: -20px;
                top: calc(69px + 84px * ${station.cards.length});
                height: 116px;
                width: 105px;
                background: url(${images["l-angle"]});
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
