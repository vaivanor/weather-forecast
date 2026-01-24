import { GridWrapper } from "../GridWrapper/GridWrapper.jsx";
import style from "./CurrentDayCard.module.scss";

export const CurrentDayCard = ({
  time,
  data,
  cityData,
  temperature,
  clouds,
  wind,
  humidity,
}) => {
  return (
    <section className={style.container}>
      <GridWrapper columns={2}>
        <div>
          <div>
            <h2>{cityData.name}</h2>
            <p className={style.date}>
              {new Date(time).toLocaleString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
                timeZone: data?.timezone,
              })}
            </p>
            <h2 className={style.temperature}>{temperature} °C</h2>
          </div>
        </div>
        <div className={style.flexContainer}>
          <p>
            Cloud cover: <b>{clouds} %</b>
          </p>
          <p>
            Wind: <b>{wind} m/s</b>
          </p>
          <p>
            Humidity: <b>{humidity} %</b>
          </p>
        </div>
      </GridWrapper>
    </section>
  );
};
