import { useState } from "react";
import showPass from "../../assets/icons/password.webp";

const FormPasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toogleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

if (showPassword === false) {
    return (
        <div>
          <input
            placeholder={props.label}
            type={props.type}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className={props.className}
          />
          <button onClick={(e) => toogleShowPassword(e)}>
            <img
              src={showPass}
              alt="pokaż hasło"
              className={props.classNameButton}
            />
          </button>
        </div>
      );
} else if (showPassword === true) {
    return (
        <div>
          <input
            placeholder={props.label}
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            className={props.className}
          />
          <button onClick={(e) => toogleShowPassword(e)}>
            <img
              src={showPass}
              alt="pokaż hasło"
              className={props.classNameButton}
            />
          </button>
        </div>
      );
}
};

FormPasswordInput.defaultProps = {
  type: "password",
};

export default FormPasswordInput;
