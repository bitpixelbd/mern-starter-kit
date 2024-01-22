import React, { useRef } from "react";

export default function RedioCheckBtn({
  label,
  value,
  key,
  checked,
  onChange
}: any) {
  const radioRef: any = useRef(null);

  const handleWrapperClick = (e: any) => {
    if (radioRef.current) {
      radioRef.current.checked = !radioRef.current.checked;
      onChange(value, radioRef.current.checked);
      // const selectedValue = radioRef.current.value;
      // setValue([selectedValue]);
      // onChangeCheckbox(selectedValue, radioRef.current.checked);
    }
  };

  return (
    <button
      key={key}
      className={`redio-select-btn title-small ${checked ? 'redio-select-btn-active' : ''}`}
      onClick={handleWrapperClick}
    >
      <input
        ref={radioRef}
        className="form-check-input"
        type="radio"
        checked={checked}
        value={value}
        name="name"
        id={"flexRadioDefault1"}
        onChange={handleWrapperClick}
      />
      <p>{label}</p>
    </button>
  );
}
