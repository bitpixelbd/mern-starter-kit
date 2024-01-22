import Quizz from "@/components/common/pop-up/Quizz";
import CalculatePopup from "@/components/common/pop-up/calculate-popup";
import ConnectExpert from "@/components/common/pop-up/contact-expert";
import SearchPopup from "@/components/common/pop-up/search-popup";
import MagnifyingGlass from "@/components/pages/home/assets/MagnifyingGlass.svg";
import Nagative from "@/components/pages/home/assets/Nagative.svg";
import USPs from "@/components/pages/home/assets/USPs.svg";
import calculate from "@/components/pages/home/assets/calculate.svg";
import calculateIcon from "@/components/pages/home/assets/calculateIcon.svg";
import phone from "@/components/pages/home/assets/phone.svg";
import { setValue } from "@/redux/slices";
import Image from "next/image";
import { useState } from "react";
import {
  QUIZES,
  STEP_1_CARE_RECEPIENT,
} from "./pop-up/component/quizz/quizOption";
import {
  EXPERTS,
  EXPERT_STEP_1_CARE_RECEPIENT,
} from "./pop-up/component/contact-expert/expertOptions";
import RequestTourPopup from "@/components/common/pop-up/request-tour-popup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function FreeServicesItem() {
  const [showModal, setShowModal] = useState(false);
  const [showCalculateModal, setShowCalculateModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  const dispatch = useDispatch();

  const modalStatus = useSelector((state: any) => state.common.modalStatus);

  //quiz states
  const [quizStep, setQuizStep] = useState(STEP_1_CARE_RECEPIENT);
  // per page quiz-options based on step
  const quizOption = QUIZES.find((quiz) => quiz?.step === quizStep);

  //Expert sates
  const [expertStep, setExpertStep] = useState(EXPERT_STEP_1_CARE_RECEPIENT);
  // per page expert-options based on step
  const expertOption = EXPERTS.find((expert) => expert?.step === expertStep);
  const toggleModal = ({ modal }: any) => {
    dispatch(setValue({ key: "modalStatus", value: modal }));
  };

  const onClickSearch = async () => {
    setShowModal(true);
  };
  const onClickCalculate = async () => {
    setShowCalculateModal(true);
  };
  const onClickExpert = async () => {
    setExpertStep(EXPERT_STEP_1_CARE_RECEPIENT);
    setShowExpertModal(true);
  };
  const onClickQuiz = async () => {
    setQuizStep(STEP_1_CARE_RECEPIENT);
    setShowQuizModal(true);
  };

  return (
    <div className="free-service-item-inner">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4">
            <div className="free-service-item">
              <Image className="free-service-item-img" src={USPs} alt="" />
              <h3 className="title-large">
                Explore Your Preferred Community with Intelligent Search
              </h3>
              <p className="body-medium">
                Take our short quiz to set your personal preferences. Our AI
                based software will assess your needs & preferences and assign
                best results with a Match Score based on how closely it matches
                your answers.
              </p>
              <button
                className="primary-short-btn primary-full-btn"
                onClick={() => onClickSearch()}
              >
                <Image src={MagnifyingGlass} alt="" />
                Explore Now
              </button>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
            <div className="free-service-item">
              <Image className="free-service-item-img" src={Nagative} alt="" />
              <h3 className="title-large">
                Navigate the Process <br /> with Our Experts
              </h3>
              <p className="body-medium">
                Our experts are always ready to help you from findining a care
                home your specific preference to completing the complex
                paperwork, navigating the funding options, move-in coordination,
                and so on. Talk to an Expert
              </p>
              <button
                className="primary-short-btn primary-full-btn"
                onClick={() => onClickExpert()}
              >
                <Image src={phone} alt="" />
                Talk to an Expert
              </button>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
            <div className="free-service-item">
              <Image className="free-service-item-img" src={calculate} alt="" />
              <h3 className="title-large">
                Calculate Care Home Pricing <br /> with Intelligent Calculator
              </h3>
              <p className="body-medium">
                Take our short quiz to set your personal preferences. Our AI
                based software will assess your needs & preferences and assign
                best results with a Match Score based on how closely it matches
                your answers.
              </p>
              <button
                className="primary-short-btn primary-full-btn"
                onClick={() => onClickCalculate()}
              >
                {/*<button className="primary-short-btn primary-full-btn" onClick={() => onClickQuiz()}>*/}
                <Image src={calculateIcon} alt="" />
                Calculate Care Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      <SearchPopup showModal={showModal} setShowModal={setShowModal} />
      <CalculatePopup
        showModal={showCalculateModal}
        setShowModal={setShowCalculateModal}
      />
      <ConnectExpert
        showModal={showExpertModal}
        setShowModal={setShowExpertModal}
        expertStep={expertStep}
        setExpertStep={(value) => setExpertStep(value)}
        found={expertOption}
      />
      <Quizz
        showModal={showQuizModal}
        setShowModal={setShowQuizModal}
        quizStep={quizStep}
        setQuizStep={(value) => setQuizStep(value)}
        found={quizOption}
      />
    </div>
  );
}
