import React, { useRef } from "react";
export default function CheckBoxBtnSubText({
  onChangeCheckbox,
  label,
  value,
  values,
  setValue,
  queryParam,
  queryString,
  checked,
}: any) {
  const checkboxRef: any = useRef(null);

  const handleWrapperClick = (e: any) => {
    e.stopPropagation();
    console.log("checkboxRef", checkboxRef.current);

    if (checkboxRef.current) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
      const isChecked = checkboxRef.current.checked;
      onChangeCheckbox(value, isChecked);
    }
  };

  return (
    <button
      className="check-box-btn check-box-btn-sub-text title-small"
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
      <h6 className="body-small">
        For seniors who need some help with daily activities and want a
        supportive community that’s active, social, and engaging.
      </h6>
    </button>
  );
}
