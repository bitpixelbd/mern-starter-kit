import React, { useState } from "react";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";
import SvgIcon from "@/components/SvgIcon";
import TopSearchBar from "@/components/common/TopSearchBar";
import Image from "next/image";
import phone from "@/components/pages/home/assets/phone.svg";
import Rectangle23 from "@/components/pages/assisted-living/assets/Rectangle23.png";
import Rectangle34 from "@/components/pages/assisted-living/assets/Rectangle34.png";
import Quizz from "@/components/common/pop-up/Quizz";
import { QUIZES, STEP_1_CARE_RECEPIENT } from "@/components/common/pop-up/component/quizz/quizOption";

export default function AssistedLivingFacility() {
    const [showQuizModal, setShowQuizModal] = useState(false);

    //quiz states
    const [quizStep, setQuizStep] = useState(STEP_1_CARE_RECEPIENT);
    // per page quiz-options based on step
    const quizOption = QUIZES.find(quiz => quiz?.step === quizStep)

    const onClickQuiz = async () => {
        setQuizStep(STEP_1_CARE_RECEPIENT)
        setShowQuizModal(true);
    }
    return (
        <>
            <div className="difference-between-inner">
                <h1 className="headline-medium">How do I choose an assisted living facility?</h1>
                <h5 className="body-regular">Choosing an Assisted Living facility is a journey infused with love, meticulous consideration, and the quest for the best quality of life for your cherished family member. The path, while deeply personal, doesn’t need to be navigated alone - Senior Places is here to gently guide you through each step, ensuring your loved one's new abode is a haven of comfort, care, and joyful living.</h5>
                <ul className="an-assisted-living-ol">
                    <li>
                        <p className="title-small-short"><b>Discover Options:</b> Utilize our user-friendly website to explore an extensive array of senior living options near you, encompassing diverse needs and preferences.</p>
                    </li>
                    <li>
                        <p className="title-small-short"><b>Perfect Match Scores:</b> Our unique matching feature invites you to complete a form, harmoniously aligning your loved one’s needs and desires with facilities that echo their requirements, simplifying your initial search with tailored suggestions.</p>
                    </li>
                    <li>
                        <p className="title-small-short"><b>Guided Decisions:</b> Our expert team at Senior Places extends their wealth of knowledge and compassionate understanding to be your steady guide in this pivotal decision-making journey. Leaning on our expertise, you can navigate the various options, understanding the nuanced offerings of each and identifying which resonates most profoundly with your loved one's unique needs and desires.</p>
                    </li>
                </ul>
                <h5 className="body-regular">As you embark on this path, you can lean on us to help you every step of the way.</h5>
                <div className="start-searching-care">
                    <div>
                        <h2 className="headline-small">Need help with finding perfect care home <br /> based on your specific preferences?</h2>
                        <h4 className="body-regular mt-3">Complete our match scoring quiz and get your perfect match!</h4>
                    </div>
                    <button className="primary-short-btn" onClick={() => onClickQuiz()}>
                        Get Perfect Match
                    </button>
                </div>
            </div>
            <Quizz
                showModal={showQuizModal}
                setShowModal={setShowQuizModal}
                quizStep={quizStep}
                setQuizStep={(value) => setQuizStep(value)}
                found={quizOption}
            />
        </>
    );
}
