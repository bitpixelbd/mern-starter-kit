import React from "react";

const ChangePasswordPage = () => {
  return (
    <>
      <h2 className="page-title">Change password</h2>
      <br />
      <form>
        <input name="_token" type="hidden" defaultValue="OuXRhw7dNx0YDUdQWQqM7iFT0lVUfjQRA00i9UC1" />
        <div className="mb-3">
          <label className="form-label" htmlFor="old_password">
            Current password:
          </label>
          <input className="form-control " id="old_password" name="old_password" type="password" placeholder="Current Password" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            New password:
          </label>
          <input className="form-control " id="password" name="password" type="password" placeholder="New Password" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password_confirmation">
            Password confirmation:
          </label>
          <input className="form-control " id="password_confirmation" name="password_confirmation" type="password" placeholder="Password Confirmation" />
        </div>
        <div className="mb-3">
          <button className="ps-btn">Update</button>
        </div>
      </form>
    </>
  );
};

export default ChangePasswordPage;
