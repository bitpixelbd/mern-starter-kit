import Brand_Logo from "@/components/pages/home/assets/footer-logo.svg";
import primaryEx from "@/components/pages/home/assets/primaryEx.svg";
import primaryFb from "@/components/pages/home/assets/primaryFb.svg";
import primaryInsta from "@/components/pages/home/assets/primaryInsta.svg";
import primaryMsg from "@/components/pages/home/assets/primaryMsg.svg";
import primaryPhone from "@/components/pages/home/assets/primaryPhone.svg";
import { siteTagLine } from "@/config/defaultMetaConfig";
import useGetSetting from "@/hooks/useGetSetting";
import { keys } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const { isLoading, isError, error, settingsData } = useGetSetting();

  return (
    <>
      <div className="footer-wrapper">
        <div className="footer-wrap">
          <div>
            <div className="col-12">
              <Link href="/">
                <Image className="footer-logo" priority src={Brand_Logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="footer-col-wrap">
            <div className="footer-first-col">
              <p className="footer-des">{settingsData?.desc}</p>

              {/* <p className="footer-des">Once we've collected your information, our team gets to work. We meticulously curate a selection of senior living communities that meet your criteria and preferences.</p> */}

              <p className="contact-us-text">Contact Us</p>

              <a href={`tel:${settingsData?.phone}`} className="footer-contact-link">
                <div>
                  <Image className="PhoneCall" priority src={primaryPhone} alt="" />
                  <p>{settingsData?.phone}</p>
                </div>
              </a>

              <a href={`mailto:${settingsData?.email}`} className="footer-contact-link">
                <div>
                  <Image className="PhoneCall" priority src={primaryMsg} alt="" />
                  <p>{settingsData?.email}</p>
                </div>
              </a>

              <div className="footer-social-icon-box">
                <h1>Social Links</h1>
                <div>
                  <Link target="_blank" href={`${settingsData?.instagram}`}>
                    <Image className="" priority src={primaryInsta} alt="" />
                  </Link>
                  <Link target="_blank" href={`${settingsData?.facebook}`}>
                    <Image className="" priority src={primaryFb} alt="" />
                  </Link>
                  <Link target="_blank" href={`${settingsData?.twitter}`}>
                    <Image priority src={primaryEx} alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <p className="footer-heading">Company</p>
              <div className="footer-sub-con">
                <Link href="#" className="sub-btn-default">
                  About us
                </Link>
                <Link href="#" className="sub-btn-default">
                  Our story
                </Link>
                <Link href="#" className="sub-btn-default">
                  Privacy policy
                </Link>
                <Link href="#" className="sub-btn-default">
                  Terms of services
                </Link>
                <Link href="#" className="sub-btn-default">
                  Sitemap
                </Link>
              </div>
            </div>
            <div>
              <p className="footer-heading">Senior living options</p>
              <div className="footer-sub-con">
                <Link href="/assisted-living" className="sub-btn-default">
                  Assisted living
                </Link>
                <Link href="/independent-living" className="sub-btn-default">
                  Independent living
                </Link>
                <Link href="/memory-care" className="sub-btn-default">
                  Memory care
                </Link>
                <Link href="#" className="sub-btn-default">
                  Respite care
                </Link>
                <Link href="#" className="sub-btn-default">
                  Home care
                </Link>
                <Link href="#" className="sub-btn-default">
                  Nursing homes
                </Link>
              </div>
            </div>
            <div>
              <p className="footer-heading">Care Resources</p>
              <div className="footer-sub-con">
                <Link href="#" className="sub-btn-default">
                  Assisted living
                </Link>
                <Link href="#" className="sub-btn-default">
                  Independent living
                </Link>
                <Link href="#" className="sub-btn-default">
                  Memory care
                </Link>
                <Link href="#" className="sub-btn-default">
                  Respite care
                </Link>
                <Link href="#" className="sub-btn-default">
                  Home care
                </Link>
                <Link href="#" className="sub-btn-default">
                  Nursing homes
                </Link>
              </div>
            </div>
            <div>
              <p className="footer-heading">For Partners</p>
              <div className="footer-sub-con">
                <Link href="#" className="sub-btn-default">
                  Partner agents
                </Link>
                <Link href="#" className="sub-btn-default">
                  Partner communities
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 copy-row">
              <div></div>
            </div>
          </div>
          <div className="copy-right-wrap">
            <p className="copy-text">© Senior Places {new Date().getFullYear()}. All Rights Reserved</p>

            <div className="terms-wrap flex-div">
              <p className="label-large">Designed by: </p>
              <Link className="body-medium label-large" target="_blank" href={`${settingsData?.brand_url
}` || "https://vixion.webflow.io"}>
                {settingsData?.brand_name || "Vixion"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
