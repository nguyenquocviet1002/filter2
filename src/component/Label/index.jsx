import labelStyled from "./label.module.scss";

const Label = ({ label, value }) => {
  return (
    <div className={labelStyled["wrapper"]}>
      <div className={labelStyled["label"]}>{label}</div>
      <div className={labelStyled["value"]}>
        {typeof value === "object" ? value.join(", ") : value}
      </div>
    </div>
  );
};

export default Label;
