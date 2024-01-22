import SvgIcon from "@/components/SvgIcon";
import tree from "@/components/pages/home/assets/tree.jpg";
import Image from 'next/image';
import React from 'react';

export default function ExploreSingleCard({ name, stateCode,  image, communities }) {

    return (
        <div className="explore-card-inner">
            {image && <Image className="explore-card-img" loader={() => image} src={image} alt="" width={500} height={500} />}
            <div className="overly-wrap">
                <div className="overly-wrap-inner">
                    <h1>{name} , {stateCode}</h1>
                    <p>{communities === 0 ? "No" : communities} Communities</p>
                    <button className="flex-div">
                        Explore
                        <SvgIcon name="chevron_right" className={''} />
                    </button>
                </div>
            </div>
        </div>
    );
}
