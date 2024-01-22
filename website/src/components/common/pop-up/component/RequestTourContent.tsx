import SvgIcon from "@/components/SvgIcon";

export default function RequestTourContent() {
    return (
        <div className="register-popup-inner">
            <h1 className="headline-medium">Request a tour at The Reserve At North Dallas</h1>
            <form>
                <div className="register-popup-inner-wrap">
                    <div className="calender-inner-wrap">
                        <div className="input-wrap">
                            <h2 className="title-small">Select a date</h2>
                            <div>
                                <input
                                    className="code-input body-small"
                                    type="text"
                                    placeholder=""
                                />
                                <button>
                                    <SvgIcon name="calender" className={'calender-icon'} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="input-wrap">
                        <h2 className="title-small">Select a time (EST)</h2>
                        <input
                            className="code-input body-small"
                            type="text"
                            placeholder=""
                        />

                    </div>
                    <div className="name-input-wrap flex-justify-Div">
                        <div className="input-wrap">
                            <h2 className="title-small">First Name*</h2>
                            <input
                                className="code-input body-small"
                                type="text"
                                placeholder="John"
                            />

                        </div>
                        <div className="input-wrap">
                            <h2 className="title-small">Last Name*</h2>
                            <input
                                className="code-input body-small"
                                type="text"
                                placeholder="Lee"
                            />
                        </div>
                    </div>
                    <div className="input-wrap">
                        <h2 className="title-small">Email Address*</h2>
                        <input
                            className="code-input body-small"
                            type="email"
                            placeholder="john@gmail.com"
                        />
                    </div>
                </div>


                <div className="check-inner">
                    <label className="container-level">
                        <input
                            type="checkbox"
                        />
                        <span className="checkmark"></span>
                    </label>
                    <p className="body-small">By sending request, you agree to receive text messages related to senior places inquiry and understand that message & data rates may apply.</p>
                </div>
                <button
                    className="primary-short-btn primary-full-btn">
                    Send tour request
                    <SvgIcon name="white_arrow_right" className={''} />
                </button>
            </form>
        </div>
    );
}
