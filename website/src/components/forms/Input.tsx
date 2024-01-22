import ErrorMessage from "../common/ErrorMessage";

type InputPropsType = {
  register: any;
  errors: any;
  name: string;
  isRequired: boolean;
  type: string | undefined;
  label: string;
  placeholder: string;
  isTextArea?: boolean;
  row: number;
  minDate: string;
};

export default function Input({ register, errors, name, isRequired, type, label, placeholder, isTextArea, row, minDate }: InputPropsType) {
  const validations = {};
  if (isRequired) {
    validations.required = "This field is required";
  }

  // const l = label ? label : name.replace("_", " ")
  //     .replace(/^([a-z])|\s+([a-z])/g, function ($1) {
  //         return $1.toUpperCase();
  //     });

  return (
    <>
      <div className="input-wrap">
        {/* <h2 className="title-small">{l}</h2> */}
        {isTextArea ? (
          <textarea className={`form-control ${errors[name] && errors[name]?.message ? "has-error" : ""}`} rows={row} placeholder={placeholder} {...register(name, validations)} />
        ) : (
          <input
            className={`form-control ${errors[name] && errors[name]?.message ? "has-error" : "form-control"}`}
            type={type}
            min={minDate && minDate}
            placeholder={placeholder}
            {...register(name, validations)}
          />
        )}

        {errors[name] && errors[name]?.message && <ErrorMessage text={errors[name]?.message} />}
      </div>
    </>
  );
}
