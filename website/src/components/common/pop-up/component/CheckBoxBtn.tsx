import React, { useRef } from "react";

export default function CheckBoxBtn({
  key,
  label,
  value,
  checked,
  onChange,
}: // values,
// setValue,
// onChangeCheckbox,
// queryParam,
// queryString,
any) {
  const checkboxRef: any = useRef(null);

  const handleWrapperClick = (e: any) => {
    e.stopPropagation();

    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
      const isChecked = checkboxRef.current.checked;
      onChange(value, isChecked);
    }
  };

  // className={`redio-select-btn title-small ${checked ? 'redio-select-btn-active' : ''}`}

  return (
    <button
      key={key}
      className={`check-box-btn title-small ${checked ? 'check-box-btn-active' : ''}`}
      onClick={handleWrapperClick}
    >
      <div className="check-inner">
        <label className="container-level">
          <input
            type="checkbox"
            checked={checked}
            ref={checkboxRef}
            onChange={handleWrapperClick}
          />
          <span className="checkmark"></span>
        </label>
        <p className="title-small">{label}</p>
      </div>
    </button>
  );
}
