import SvgIcon from "@/components/SvgIcon";
import DateInput from "@/components/forms/DateInput";
import Input from "@/components/forms/Input";
import { post } from "@/services/api/api";
import { API_POST_REQUEST_TOUR } from "@/services/api/endpoints";
import { showToast } from "@/utils/toastUtils";
import { getSelectedDateTime } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import '@smastrom/react-rating/style.css';
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { boolean, object, string } from "yup";

const CalenderIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20" fill="none">
        <path d="M16.25 2.5H14.375V1.875C14.375 1.70924 14.3092 1.55027 14.1919 1.43306C14.0747 1.31585 13.9158 1.25 13.75 1.25C13.5842 1.25 13.4253 1.31585 13.3081 1.43306C13.1908 1.55027 13.125 1.70924 13.125 1.875V2.5H6.875V1.875C6.875 1.70924 6.80915 1.55027 6.69194 1.43306C6.57473 1.31585 6.41576 1.25 6.25 1.25C6.08424 1.25 5.92527 1.31585 5.80806 1.43306C5.69085 1.55027 5.625 1.70924 5.625 1.875V2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM5.625 3.75V4.375C5.625 4.54076 5.69085 4.69973 5.80806 4.81694C5.92527 4.93415 6.08424 5 6.25 5C6.41576 5 6.57473 4.93415 6.69194 4.81694C6.80915 4.69973 6.875 4.54076 6.875 4.375V3.75H13.125V4.375C13.125 4.54076 13.1908 4.69973 13.3081 4.81694C13.4253 4.93415 13.5842 5 13.75 5C13.9158 5 14.0747 4.93415 14.1919 4.81694C14.3092 4.69973 14.375 4.54076 14.375 4.375V3.75H16.25V6.25H3.75V3.75H5.625ZM16.25 16.25H3.75V7.5H16.25V16.25Z" fill="#549BA0" />
    </svg>
)

const WatchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM12 20.25C10.3683 20.25 8.77326 19.7661 7.41655 18.8596C6.05984 17.9531 5.00242 16.6646 4.378 15.1571C3.75358 13.6496 3.5902 11.9908 3.90853 10.3905C4.22685 8.79016 5.01259 7.32015 6.16637 6.16637C7.32016 5.01259 8.79017 4.22685 10.3905 3.90852C11.9909 3.59019 13.6497 3.75357 15.1571 4.37799C16.6646 5.00242 17.9531 6.05984 18.8596 7.41655C19.7661 8.77325 20.25 10.3683 20.25 12C20.2475 14.1873 19.3775 16.2843 17.8309 17.8309C16.2843 19.3775 14.1873 20.2475 12 20.25ZM18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H12C11.8011 12.75 11.6103 12.671 11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12Z" fill="#549BA0" />
    </svg>
)

export default function RequestTourStep1({ careHomeId, careHomeName, setShowModal }) {

    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const [error, setError] = useState('')

    let userSchema = object({
        first_name: string().required("First name is required"),
        last_name: string().required("Last name is required"),
        agree_check: boolean().oneOf([true], 'Please agree to senior places inquiry')
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(userSchema) });


    const requestTourMutation = useMutation(
        async (data) => await post(API_POST_REQUEST_TOUR, data),
        {
            onSuccess: (res) => {
                showToast("success", "Tour Request Send Successfully")
                setShowModal(false)
            },
            onError: (err) => {
                if (err && err?.response?.data) {
                    setError(err?.response?.data?.message);
                }
            },
        }
    );

    const onFormSubmit = (data: any) => {
        const date = getSelectedDateTime('date', startDate)
        const est_time = getSelectedDateTime('time',startTime );
        const payload = {
            care_home_id: careHomeId,
            first_name: data?.first_name,
            last_name: data?.last_name,
            email: data?.email,
            phone: data?.phone,
            date,
            est_time,
        }
        requestTourMutation.mutate(payload);
    };

    const today = new Date();

    return (
        <>
            <div className="step-wrapper">
                <h1 className="headline-small">Request a tour at {careHomeName}</h1>
                <div className="step-middle">
                    <form noValidate>
                        <div className="input-wrap">
                            <DateInput
                                showIcon={true}
                                icon={CalenderIcon}
                                dateOrTimeFormatString={'MM/dd/yyyy'}
                                selectedDate={startDate}
                                onChangeDate={(date) => setStartDate(date)}
                                minDate={today}
                                highlightDates={startDate}
                            />
                        </div>

                        <div className="input-wrap">
                            <DateInput
                                showTimeSelectOnly
                                timeIntervals={15}
                                showIcon={true}
                                icon={WatchIcon}
                                selectedDate={startTime}
                                onChangeDate={(time) => setStartTime(time)}
                                minDate={today}
                                highlightDates={startTime}
                                dateOrTimeFormatString={'HH:mm'}
                                timeFormatString={"HH:mm"}
                            />
                        </div>

                        <div className="name-input-wrap flex-justify-Div">
                            <Input
                                type="text"
                                register={register}
                                errors={errors}
                                isRequired={true}
                                name="first_name"
                                label="First Name*"
                            />
                            <Input
                                label="Last Name*"
                                type="text"
                                register={register}
                                errors={errors}
                                isRequired={true}
                                name="last_name"
                            />
                        </div>
                        <Input
                            register={register}
                            errors={errors}
                            isRequired={false}
                            name="email"
                            type="email"
                            label="Email Address"
                        />
                        <Input
                            register={register}
                            errors={errors}
                            isRequired={false}
                            name="phone"
                            type="text"
                            label="Phone"
                        />
                        <div className="check-inner">
                            <label className="container-level">
                                <input
                                    type="checkbox"
                                    {...register("agree_check")}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <p className="body-small">By sending request, you agree to receive text messages related to senior places inquiry and understand that message & data rates may apply.</p>
                        </div>
                    </form>
                </div>
                {
                    error !== '' &&
                    <div className={'alert alert-danger'}>
                        {error}
                    </div>
                }
                <div className="step-btn flex-div-12gap">
                    <button
                        className="primary-short-btn primary-full-btn request-tour-btn"
                        onClick={handleSubmit(onFormSubmit)}
                        disabled={requestTourMutation.isLoading}
                    >{requestTourMutation.isLoading ? "Please wait ..." : "Send tour request"}<SvgIcon name="white_arrow_right" className={''} /></button>
                </div>
            </div>
        </>
    )
}
