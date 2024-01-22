import LogInInitialBtn from "@/components/common/LogInInitialBtn";
import TopSearchBar from "@/components/common/TopSearchBar";
import UserContent from "@/components/common/UserContent";
import SvgIcon from "@/components/SvgIcon";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import RegisterPopup from "@/components/common/pop-up/register-popup";
import AssistedDropdown from "@/components/common/header/component/AssistedDropdown";
import MemoryDropdown from "@/components/common/header/component/MemoryDropdown";
import IndependentDropdown from "@/components/common/header/component/IndependentDropdown";

export default function MobileMenuTop() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDrop, setIsDrop] = useState(false);
    const [isMemory, setIsMemory] = useState(false);
    const [isIndependent, setIsIndependent] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);


    const showSidebar = () => {
        setIsOpen(true);

        // // Disables Background Scrolling whilst the SideDrawer/Modal is open
        // if (typeof window != 'undefined' && window.document) {
        //     document.body.style.overflow = 'hidden';
        // }
    }
    const closeSidebar = () => {
        setIsOpen(false);

        // Unsets Background Scrolling to use when SideDrawer/Modal is closed
        // document.body.style.overflow = 'unset';
    }



    const dropToggleMenu = (e) => {
        e.preventDefault();
        setIsDrop((drop) => !drop)
    }
    const memoryToggleMenu = (e) => {
        e.preventDefault();
        setIsMemory((drop) => !drop)
    }
    const independentToggleMenu = (e) => {
        e.preventDefault();
        setIsIndependent((drop) => !drop)
    }

    // // Click Outside closed
    // let menuRef = useRef();
    // let menuMemoryRef = useRef();
    // let menuIndependentRef = useRef();
    // useEffect(() => {
    //     let handler = (e) => {
    //         if (!menuRef.current.contains(e.target)) {
    //             setIsDrop(false);
    //         }
    //         if (!menuMemoryRef.current.contains(e.target)) {
    //             setIsMemory(false);
    //         }
    //         if (!menuIndependentRef.current.contains(e.target)) {
    //             setIsIndependent(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handler);
    //     return() => {
    //         document.removeEventListener("mousedown", handler);
    //     }
    // });

    return (
        <div className="mobile-menu-top-wrap">
            {!isOpen &&
                <button className="mobile-menu-btn" onClick={showSidebar}>
                    <SvgIcon name="List" className={''}/>
                </button>
            }
            {isOpen &&
                <button className="mobile-menu-btn" onClick={closeSidebar}>
                    <SvgIcon name="List_active" className={''}/>
                </button>
            }
            {isOpen &&
                <div className="mobile-menu-content">
                    <div className="bottom-head-wrap">
                        <ul>
                            <li>
                                <Link href={''} className={isDrop ? "active flex-div" : "flex-div"} onClick={dropToggleMenu}>
                                    Assisted Living
                                    <SvgIcon name={isDrop ? "savron_up_primary" : "savron_down"} className={''}/>
                                    <SvgIcon name={isDrop ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'}/>
                                </Link>
                                {isDrop &&
                                    <AssistedDropdown isEnabled={isDrop} />
                                }
                            </li>
                            <li>
                                <Link href={''} className={isMemory ? "active flex-div" : "flex-div"} onClick={memoryToggleMenu} >
                                    Memory Care
                                    <SvgIcon name={isMemory ? "savron_up_primary" : "savron_down"} className={'savron_icon'}/>
                                    <SvgIcon name={isMemory ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'}/>
                                </Link>
                                {isMemory &&
                                    <MemoryDropdown isEnabled={isMemory} />
                                }
                            </li>
                            <li>
                                <Link href={''} className={isIndependent ? "active flex-div" : "flex-div"} onClick={independentToggleMenu} >
                                    Independent Living
                                    <SvgIcon name={isIndependent ? "savron_up_primary" : "savron_down"} className={'savron_icon'}/>
                                    <SvgIcon name={isIndependent ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'}/>
                                </Link>
                                {isIndependent &&
                                    <IndependentDropdown isEnabled={isIndependent} />
                                }
                            </li>
                            <li>
                                <Link href="#" className="flex-div">
                                    Nursing Homes
                                    <SvgIcon name="savron_down" className={''}/>
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex-div">
                                    Company
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex-div">
                                    Resources
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex-div">
                                    Affiliate Programs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}
