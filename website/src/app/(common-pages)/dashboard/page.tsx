export const metadata = {
  title: "User",
};

const UserDashboard = () => {
  return (

    <div className="d-flex ">
      <div className="ps-section__right">
        <div className="ps-section--account-setting">
          <div className="ps-section__header">
            <h3>Account information</h3>
          </div>
          <div className="ps-section__content">
            <p>
              <i className="icon-user" />
              &nbsp;<span className="d-inline-block">Name:</span>&nbsp;
              <strong>Yoko House</strong>
            </p>
            <p>
              <i className="icon-envelope" />
              &nbsp;<span className="d-inline-block">Email:</span>&nbsp;
              <strong>mimeveg@mailinator.com</strong>
            </p>
            <p>
              <i className="icon-phone-bubble" />
              &nbsp;<span className="d-inline-block">Phone:</span>&nbsp;
              <strong>N/A</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
