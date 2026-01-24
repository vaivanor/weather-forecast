import style from "./GridWrapper.module.scss";

export const GridWrapper = ({ children, columns = 2, customStyle }) => {
  return (
    <div
      className={style.container}
      style={{ "--columns": columns, ...customStyle }}
    >
      {children}
    </div>
  );
};
