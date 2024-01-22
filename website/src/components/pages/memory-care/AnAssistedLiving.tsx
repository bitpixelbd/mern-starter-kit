import React from "react";
import AssistedLivingSideBar from "@/components/pages/assisted-living/AssistedLivingSideBar";
import AssistedLivingSideContent from "@/components/pages/assisted-living/AssistedLivingSideContent";
import SvgIcon from "@/components/SvgIcon";
import TopSearchBar from "@/components/common/TopSearchBar";
import Image from "next/image";
import phone from "@/components/pages/home/assets/phone.svg";
import Rectangle23 from "@/components/pages/assisted-living/assets/Rectangle23.png";
import Rectangle34 from "@/components/pages/assisted-living/assets/Rectangle34.png";

export default function AnAssistedLiving() {
  return (
      <div className="difference-between-inner">
          <h1 className="headline-medium">What are some key signs that it may be time to move into an assisted living?</h1>
          <h5 className="body-regular">Witnessing our loved ones age and possibly struggle with tasks that once came effortlessly can be a heartrending journey. Recognizing when it might be time for Assisted Living is a crucial step not only in ensuring their safety and well-being but also in enriching their life with support and community. Here are some tender signals that it might be time to consider this transition:</h5>

          <div className="key-characteristics">
              <ol>
                  <li><p className="title-small-short"><b>Safety Concerns: </b> Frequent falls, forgotten stovetops, or missed medication doses might indicate that living alone is no longer the safest option.</p></li>
                  <li><p className="title-small-short"><b>Declining Health:</b> Noticeable weight loss, diminished mobility, or escalating health issues might suggest they could benefit from a supportive living environment.</p></li>
                  <li><p className="title-small-short"><b>Loneliness:</b> Isolation and the sadness it breeds can be gently mitigated in an assisted living community where social opportunities abound.</p></li>
                  <li><p className="title-small-short"><b>Decreased Home Maintenance:</b> An unkempt living space or neglected chores might hint at struggling with maintaining their home or a lack of motivation.</p></li>
                  <li><p className="title-small-short"><b>Personal Hygiene:</b> A decline in maintaining personal care, such as grooming and bathing, is often a poignant sign that assistance is needed.</p></li>
                  <li><p className="title-small-short"><b>Memory Lapses:</b> Forgetfulness, especially related to important matters like appointments or bill payments, might signal cognitive changes that require professional oversight.</p></li>
              </ol>
          </div>
          <h5 className="body-regular">As you gently navigate these waters, remember that the move to assisted living doesn’t signify a loss of independence for your loved one. Rather, it’s a loving step towards providing them with a supportive, secure, and socially engaging environment, where their unique needs can be met with empathy and expertise. Choosing assisted living is a profound expression of love and care, ensuring they continue to thrive in a space that’s attuned to their evolving needs, surrounded by understanding professionals and a new community of friends.</h5>
          <h3 className="title-large">Which changes may indicate a need for assisted living?</h3>
          <h5 className="body-regular">Navigating the journey of aging brings a multitude of changes, some subtle and some more pronounced, that may indicate a need for the supportive environment provided by Assisted Living. Here are key changes that may gently hint towards considering this transition:</h5>
          <ol className="an-assisted-living-ol">
              <li>
                  <p className="title-small">Physical Changes:</p>
                  <ul>
                      <li className="title-small-short">Frequent falls or unsteadiness</li>
                      <li className="title-small-short">Noticeable weight loss or gain</li>
                      <li className="title-small-short">Declining personal hygiene</li>
                      <li className="title-small-short">Observable fatigue or lack of energy</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Cognitive and Emotional Changes:</p>
                  <ul>
                      <li className="title-small-short">Memory lapses, especially regarding medications and appointments</li>
                      <li className="title-small-short">Shifts in mood or heightened emotional distress</li>
                      <li className="title-small-short">Withdrawal from social activities or isolation</li>
                      <li className="title-small-short">General disinterest in hobbies or activities once enjoyed</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Home and Safety Concerns:</p>
                  <ul>
                      <li className="title-small-short">Neglect of household maintenance and chores</li>
                      <li className="title-small-short">Unattended bills, mail, or administrative tasks</li>
                      <li className="title-small-short">Instances of forgetting to turn off appliances</li>
                      <li className="title-small-short">Misplacing items frequently</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Social and Behavioral Changes:</p>
                  <ul>
                      <li className="title-small-short">Decreased social interaction</li>
                      <li className="title-small-short">Reports of loneliness or expressions of not wanting to be alone</li>
                      <li className="title-small-short">Resistance to leaving the house</li>
                      <li className="title-small-short">Anxiousness regarding routine changes</li>
                  </ul>
              </li>
              <li>
                  <p className="title-small">Health and Wellness Changes:</p>
                  <ul>
                      <li className="title-small-short">Escalating health issues or increasing number of prescriptions</li>
                      <li className="title-small-short">Difficulty managing medications accurately and timely</li>
                      <li className="title-small-short">Recovery struggles after a health issue or hospitalization</li>
                  </ul>
              </li>
          </ol>
          <h5 className="body-regular">Observing these changes in your loved ones can be a delicate experience, warranting compassionate conversations and thoughtful considerations regarding their evolving needs and wellbeing. Assisted Living communities can provide a warm, secure, and lively environment that nurtures their physical health, social interactions, and mental wellness with utmost care and empathy.</h5>

      </div>
  );
}
