import { GridWrapper } from "../GridWrapper/GridWrapper.jsx";
import style from "./NextDayCard.module.scss";

const toNoon = (dateStr) => `${dateStr}T12:00:00`;

export const NextDayCard = ({
  date,
  data,
  tempMin,
  tempMax,
  cloudsMean,
  windMax,
  humidityMean,
}) => {
  return (
    <section className={style.container}>
      <GridWrapper columns={2}>
        <div>
          <h3>
            {" "}
            {new Date(date).toLocaleString(undefined, {
              weekday: "long",
              timeZone: data?.timezone,
            })}
          </h3>
          <p className={style.date}>
            {new Date(date).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              timeZone: data?.timezone,
            })}
          </p>
          <div>
            <h2 className={style.temperature}>{tempMax.toFixed(0)} °C</h2>
            <p>{tempMin.toFixed(0)} °C</p>
          </div>
        </div>

        <div className={style.flexContainer}>
          <p>
            Cloud cover: <b>{cloudsMean} %</b>
          </p>
          <p>
            Wind: <b>{windMax} m/s</b>
          </p>
          <p>
            Humidity: <b>{humidityMean} %</b>
          </p>
        </div>
      </GridWrapper>
    </section>
  );
};
