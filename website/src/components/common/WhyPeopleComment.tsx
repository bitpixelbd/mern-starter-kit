import SvgIcon from "@/components/SvgIcon";
import Image from 'next/image';
import User from "./header/assets/User.svg";

export default function WhyPeopleComment({testimonial}) {
    return (
        <>
            <div className="why-people-comment-inner">
                <SvgIcon name="top_qute" className={'qute-top-align'}/>
                 <p  className="people-comment body-regular">{testimonial?.desc}</p>
                <div className="user-details-box">
                    {/* <SvgIcon name="users" className={'user-avater-icon'}/> */}
                    <img className={'user-avater-icon'} src={testimonial?.image} alt="user image" width="300" height="300" />
                    <div>
                        <h1>{testimonial?.user_name}</h1>
                        <p>{testimonial?.city}</p>
                    </div>
                </div>
                <SvgIcon name="bottom_qute" className={'qute-bottom-align'}/>
            </div>
        </>
    )
}