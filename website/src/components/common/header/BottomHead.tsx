import SvgIcon from "@/components/SvgIcon";
import AssistedDropdown from "@/components/common/header/component/AssistedDropdown";
import IndependentDropdown from "@/components/common/header/component/IndependentDropdown";
import MemoryDropdown from "@/components/common/header/component/MemoryDropdown";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function BottomHead() {
    const [isDrop, setIsDrop] = useState(false);
    const [isMemory, setIsMemory] = useState(false);
    const [isIndependent, setIsIndependent] = useState(false);

    const dropToggleMenu = (e) => {
        e.preventDefault();
        setIsDrop((isDrop) => !isDrop)
    }
    const memoryToggleMenu = (e) => {
        e.preventDefault();
        setIsMemory((isMemory) => !isMemory)
    }
    const independentToggleMenu = (e) => {
        e.preventDefault();
        setIsIndependent((isIndependent) => !isIndependent)
    }
    // Click Outside closed
    let menuRef = useRef();
    let menuMemoryRef = useRef();
    let menuIndependentRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsDrop(false);
            }
            if (!menuMemoryRef.current.contains(e.target)) {
                setIsMemory(false);
            }
            if (!menuIndependentRef.current.contains(e.target)) {
                setIsIndependent(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });

    return (
        <>
            <div className="bottom-head-wrapper">
                <div className="bottom-head-wrap">
                    <ul>
                        <li ref={menuRef}>
                            <Link href={''} className={isDrop ? "active flex-div" : "flex-div"} onClick={dropToggleMenu}>
                                Assisted Living
                                <SvgIcon name={isDrop ? "savron_up_primary" : "savron_down"} className={'savron_icon'} />
                                <SvgIcon name={isDrop ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                            </Link>
                            {isDrop &&
                                <AssistedDropdown isEnabled={isDrop} />
                            }
                        </li>
                        <li ref={menuMemoryRef}>
                            <Link href={''} className={isMemory ? "active flex-div" : "flex-div"} onClick={memoryToggleMenu} >
                                Memory Care
                                <SvgIcon name={isMemory ? "savron_up_primary" : "savron_down"} className={'savron_icon'} />
                                <SvgIcon name={isMemory ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                            </Link>
                            {isMemory &&
                                <MemoryDropdown  isEnabled={isMemory} />
                            }
                        </li>
                        <li ref={menuIndependentRef}>
                            <Link href={''} className={isIndependent ? "active flex-div" : "flex-div"} onClick={independentToggleMenu} >
                                Independent Living
                                <SvgIcon name={isIndependent ? "savron_up_primary" : "savron_down"} className={'savron_icon'} />
                                <SvgIcon name={isIndependent ? "savron_up_primary" : "savron_down_primary"} className={'savron_icon'} />
                            </Link>
                            {isIndependent &&
                                <IndependentDropdown isEnabled={isIndependent} />
                            }
                        </li>
                        <li>
                            <Link href="#" className="flex-div">
                                Nursing Homes
                                <SvgIcon name="savron_down" className={'savron_icon'} />
                                <SvgIcon name="savron_down_primary" className={'savron_icon'} />
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
        </>
    )
}
