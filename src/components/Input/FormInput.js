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
      <form>
        <label>{label}</label>
        <input
          type={type}
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className={className}
        />
      </form>
    );
  }

  return (
    <form>
      <input
        ref={props?.innerRef}
        placeholder={label || props?.placeholder}
        type={type}
        value={value}
        onKeyDown={(e) => onKeyDown(e)}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </form>
  );
};

FormInput.defaultProps = {
  type: "text",
};
