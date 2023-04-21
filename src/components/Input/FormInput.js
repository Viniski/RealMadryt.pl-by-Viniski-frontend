export const FormInput = ({
  label,
  type,
  value,
  className,
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
    <div>
      <input
        ref={props?.innerRef}
        placeholder={label || props?.placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </div>
  );
};

FormInput.defaultProps = {
  type: "text",
};
