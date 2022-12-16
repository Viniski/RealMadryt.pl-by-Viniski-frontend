export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const availableRules = {
  required(value) {
    return value ? "" : "Pole wymagane";
  },
  min(value, rule) {
    console.log(rule, value);
    return value.length >= rule.length
      ? ""
      : `Minimalna liczba znaków: ${rule.length}`;
  },
  email(value) {
    return validateEmail(value) ? "" : "Niepoprawny email";
  },
  compare(value, password) {
    console.log(value, password);
    return value === password ? "" : `Podane hasła nie sa identyczne`; //porównanie 3/2 bo string/number ?????
  },
};

export function validate(rules = [], value, password) {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule instanceof Object) {
      let errorMessage;
      if (rule.rule === "compare") {
        errorMessage = availableRules[rule.rule](value, password); 
      } else {
        errorMessage = availableRules[rule.rule](value, rule);
      }
      if (errorMessage) {
        return errorMessage;
      }
    } else {
      const errorMessage = availableRules[rule](value);
      if (errorMessage) {
        return errorMessage;
      }
    }
  }
  return "";
}
