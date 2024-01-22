import React, { useState } from "react";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";
import SvgIcon from "@/components/SvgIcon";
import TopSearchBar from "@/components/common/TopSearchBar";
import Image from "next/image";
import phone from "@/components/pages/home/assets/phone.svg";
import Rectangle23 from "@/components/pages/assisted-living/assets/Rectangle23.png";
import Rectangle34 from "@/components/pages/assisted-living/assets/Rectangle34.png";
import { EXPERTS, EXPERT_STEP_1_CARE_RECEPIENT } from "@/components/common/pop-up/component/contact-expert/expertOptions";
import ConnectExpert from '@/components/common/pop-up/contact-expert';

export default function DifferenceBetween() {

    const [showExpertModal, setShowExpertModal] = useState(false);
    
    const [expertStep, setExpertStep] = useState(EXPERT_STEP_1_CARE_RECEPIENT);
    const expertOption = EXPERTS.find(expert => expert?.step === expertStep)
    const onClickExpert = async () => {
        setExpertStep(EXPERT_STEP_1_CARE_RECEPIENT)
        setShowExpertModal(true);
    }

    return (
        <>
            <div className="difference-between-inner">
                <h1 className="headline-medium">What's the difference between assisted living <br />and other senior care types?</h1>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th className="title-small">Services</th>
                                <th className="title-small">Independent Living</th>
                                <th className="title-small">Memory Care</th>
                                <th className="title-small">Assisted Living</th>
                                <th className="title-small">Nursing Home</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="body-small">Meal Services</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr className="bg-table-tr">
                                <td className="body-small">Housekeeping and laundry services</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr>
                                <td className="body-small">Social activities</td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr className="bg-table-tr">
                                <td className="body-small">Exercise and wellness classes</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr>
                                <td className="body-small">Medication management</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr className="bg-table-tr">
                                <td className="body-small">Help with daily activities (ADLs)</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr>
                                <td className="body-small">Specialized care for patients with memory loss</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr className="bg-table-tr">
                                <td className="body-small">24-hour care and supervision</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr>
                                <td className="body-small">Secured entrances and exits to prevent wandering</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                            </tr>
                            <tr className="bg-table-tr">
                                <td className="body-small">Transportation to appointments</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="cross" className={''} /></td>
                            </tr>
                            <tr>
                                <td className="body-small">Memory-enhancing therapies</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="cross" className={''} /></td>
                            </tr>
                            <tr className="bg-table-tr">
                                <td className="body-small">Unique facility layout and design to reduce confusion</td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="tick" className={''} /></td>
                                <td><SvgIcon name="cross" className={''} /></td>
                                <td><SvgIcon name="cross" className={''} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 className="title-large">Assisted Living vs. Independent Living</h3>
                <h5 className="body-regular">When navigating through senior living options, it's essential to grasp the distinctions between <b>Assisted Living</b> and <b>Independent Living</b>. Independent Living is primarily geared towards seniors who are fully autonomous, providing them with convenient services like housekeeping and maintenance, as well as social and recreational activities, all within a community of their peers. On the flip side, Assisted Living offers a higher level of support by additionally providing assistance with Activities of Daily Living (ADLs), such as bathing, dressing, and medication management, tailored to the individual needs of the residents. While both cater to senior living, Assisted Living extends a helping hand in daily routines, ensuring supportive care is readily available, whereas Independent Living prioritizes a lifestyle of self-sufficiency, with less emphasis on personal care and more focus on convenience and socialization.</h5>
                <h3 className="title-large">Assisted Living vs. Nursing Homes</h3>
                <h5 className="body-regular">The critical distinction between <b>Assisted Living</b> and <b>Nursing Homes</b> often revolves around the intensity and type of medical and personal care provided. Assisted Living communities primarily cater to seniors who require some help with daily activities, yet wish to maintain a level of independence, offering a balance of personal care and autonomy within a socially vibrant environment. In contrast, Nursing Homes are medical facilities designed to provide 24/7 skilled nursing care and therapy services for seniors who have significant health conditions or require round-the-clock monitoring and assistance. While Assisted Living prioritizes a blend of independence and assistance, Nursing Homes delve deeper into continuous, medical, and personal care, often accommodating those with substantial health and mobility challenges.</h5>
                <div className="start-searching-care">
                    <h2 className="headline-small">Need help with finding perfect care home <br /> based on your specific preferences?</h2>
                    <button className="primary-short-btn" onClick={() => onClickExpert()}>
                        <Image
                            src={phone}
                            alt="" />
                        Talk to an Expert
                    </button>
                </div>
                <h3 className="title-large">Assisted Living vs. Memory Care</h3>
                <h5 className="body-regular">Distinguishing between <b>Assisted Living</b> and <b>Memory Care</b> illuminates the specialized approach towards the unique needs of seniors within these communities. While both options provide assistance with activities of daily living (ADLs), Memory Care specifically tailors its environment, programs, and care to seniors experiencing memory loss, dementia, or Alzheimer’s disease. Memory Care units often feature enhanced security measures, structured routines, and specialized activities to nurture individuals with cognitive impairments. In contrast, Assisted Living provides a broader range of support, assisting seniors who need help with ADLs but are largely independent, emphasizing a combination of care, support, and numerous social activities. Thus, while Assisted Living attends to general needs and maintains semi-independence, Memory Care delves into detailed, specialized care for those with memory-related challenges.</h5>
                <h3 className="title-large">Assisted Living vs. Home Care</h3>
                <h5 className="body-regular">Comparing <b>Assisted Living</b> and <b>Home Care</b> necessitates exploring the divergent yet essential facets of senior care each provides. Assisted Living communities offer a confluence of independent living, structured support, and an engaging social environment which can be pivotal for seniors' mental and emotional well-being. One of the primary benefits that steer families towards Assisted Living is the vibrant, interactive community that is naturally built-in. Seniors can participate in a myriad of activities, form new friendships, and remain socially active, which is crucial for healthy aging. Additionally, these communities provide a secure environment with ready access to assistance, structured routines, and balanced nutrition. On the contrary, while Home Care delivers personalized care within the comfort of one’s own home and can cater to specific care needs, it might lack the social and communal aspects inherently provided by Assisted Living. Consequently, choosing Assisted Living can be especially beneficial for fostering social interactions, continuous engagement, and providing a layered support system within a community setting.</h5>
                <div className="double-img-wrapper">
                    <Image
                        className="assisted_living_single"
                        src={Rectangle23}
                        alt=""
                    />
                    <Image
                        className="assisted_living_single"
                        src={Rectangle34}
                        alt=""
                    />
                </div>
            </div>
            <ConnectExpert
                showModal={showExpertModal}
                setShowModal={setShowExpertModal}
                expertStep={expertStep}
                setExpertStep={(value) => setExpertStep(value)}
                found={expertOption}
            />
        </>
    );
}
