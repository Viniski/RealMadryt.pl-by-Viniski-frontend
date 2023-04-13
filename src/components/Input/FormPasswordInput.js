import { useState } from "react";
import showPass from "../../assets/icons/password.webp";

export const FormPasswordInput = ({
  label,
  type,
  value,
  className,
  classNameButton,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toogleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  if (showPassword === false) {
    return (
      <div>
        <input
          placeholder={label}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
        <button onClick={(e) => toogleShowPassword(e)}>
          <img src={showPass} alt="pokaż hasło" className={classNameButton} />
        </button>
      </div>
    );
  } else if (showPassword === true) {
    return (
      <div>
        <input
          placeholder={label}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
        <button onClick={(e) => toogleShowPassword(e)}>
          <img src={showPass} alt="pokaż hasło" className={classNameButton} />
        </button>
      </div>
    );
  }
};

FormPasswordInput.defaultProps = {
  type: "password",
};
