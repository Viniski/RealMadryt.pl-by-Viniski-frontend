export const FormInput = ({
  label,
  type,
  value,
  className,
  onKeyDown,
  onChange,
  ...props
}) => {
  if (type === "checkbox") {
    return (
      <div>
        <label>{label}</label>
        <input
          type={type}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className={className}
        />
      </div>
    );
  }

  return (
    <input
      ref={props?.innerRef}
      placeholder={label || props?.placeholder}
      type={type}
      value={value}
      onKeyDown={(e) => onKeyDown(e)}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
};

FormInput.defaultProps = {
  type: "text",
};
