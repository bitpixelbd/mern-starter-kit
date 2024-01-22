import SvgIcon from "@/components/SvgIcon";
import Input from "@/components/forms/Input";
import { post } from "@/services/api/api";
import { API_POST_CONTACT_EXPERT_INFO } from "@/services/api/endpoints";
import { EXPERT_ANSWER_LOCAL_STORAGE_KEY, getQuizAnswersfromLS } from "@/utils/quiz";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { object, string } from "yup";
import StepSubmitSucces from "./StepSubmitSucces";

const VIEW_FORM = 'form'
const VIEW_SUCCESS = 'success'
export default function ContactExpertStep7({ step, setStep, expert }) {

    const [currentView, setCurrentView] = useState(VIEW_FORM);

    let userSchema = object({
        first_name: string().required("First name is required"),
        last_name: string().required("Last name is required"),
        phone: string().required("Phone is required"),
        email: string().email().required("Email is required"),

    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({ resolver: yupResolver(userSchema) });

    const constactExpertMutation = useMutation(
        async (data) => await post(API_POST_CONTACT_EXPERT_INFO, data),
        {
            onSuccess: (res) => {
                setCurrentView(VIEW_SUCCESS)
            },
            onError: (err) => {

            },
        }
    );

    const onFormSubmit = (data: any) => {
        const answers = getQuizAnswersfromLS(EXPERT_ANSWER_LOCAL_STORAGE_KEY);
        const payload = { ...answers, ...data, }

        payload.city_or_post_code = answers?.location ? answers?.location : '';

        delete payload['location'];

        constactExpertMutation.mutate(payload);
    };

    return (
        <>
            <div className="step-wrapper">
                {
                    currentView === VIEW_FORM &&

                    <>
                        <h1 className="headline-small">Contact Informations</h1>
                        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                            <div className="step-middle">
                                <div className="name-input-wrap flex-justify-Div">
                                    <Input
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                        name="first_name"
                                    />
                                    <Input
                                        register={register}
                                        errors={errors}
                                        isRequired={true}
                                        name="last_name"
                                    />
                                </div>
                                <Input
                                    register={register}
                                    errors={errors}
                                    isRequired={true}
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                />
                                <Input
                                    register={register}
                                    errors={errors}
                                    isRequired={true}
                                    name="phone"
                                    type="text"
                                />
                            </div>
                            <div className="step-btn flex-div-12gap">
                                {
                                    expert.prevStep &&
                                    <button
                                        className="secondary-short-btn flex-div-8gap"
                                        onClick={() => setStep(expert.prevStep)}
                                    >
                                        <SvgIcon name="primary_arrow_left" className={''} />Back
                                    </button>

                                }
                                <button
                                    className="primary-short-btn"
                                    type="submit"
                                    disabled={constactExpertMutation.isLoading}
                                >
                                    {constactExpertMutation.isLoading
                                        ?
                                        'Please wait...'

                                        : 'Send Your Request'
                                    }
                                </button>
                                {/* <button className="secondary-short-btn flex-div-8gap"><SvgIcon name="primary_arrow_left" className={''} />Back</button>
                        <button className="primary-short-btn">Send Your Request</button> */}
                            </div>
                        </form>
                    </>
                }

                {
                    currentView === VIEW_SUCCESS &&
                    <StepSubmitSucces />

                }
            </div>
        </>
    )
}
