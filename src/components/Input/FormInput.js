const FormInput = (props) => {
  if (props.type === "checkbox") {
    return (
      <div>
        <label>{props.label}</label>
        <input
          type={props.type}
          checked={props.value}
          onChange={(e) => props.onChange(e.target.checked)}
          className={props.className}
        />
      </div>
    );
  }

  return (
      <input
        ref={props?.innerRef}
        placeholder={props.label || props?.placeholder}
        type={props.type}
        value={props.value}
        onKeyDown={(e) => props.onKeyDown(e)}
        onChange={(e) => props.onChange(e.target.value)}
        className={props.className}
      />
  );
};

FormInput.defaultProps = {
  type: "text",
};

export default FormInput;
