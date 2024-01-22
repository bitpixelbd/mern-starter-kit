import SvgIcon from "@/components/SvgIcon";
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_KEY_TOKEN, PAGE_HOME, PAGE_PARTNER_DASBOARD, PAGE_USER_DASBOARD, ROLE_USER } from '@/config/constants';
import useUser from '@/hooks/userUser';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";

export default function UserContent() {
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const router = useRouter()
    const { user } = useUser()
    let role = user?.role;
    
    if ((role === undefined) && (typeof window !== 'undefined')) {
        role = localStorage?.getItem("userRole");
    }


    const homebaseUrl = role === ROLE_USER ? PAGE_USER_DASBOARD : PAGE_PARTNER_DASBOARD;


    const onClickRegister = async () => {
        setShowRegisterModal(true);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        window.localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
        router.replace(PAGE_HOME);
        window.location.reload()

    }
    return (
        <div className="user-content-wrap">
            <div className="user-content-inner flex-div-8gap">
                <Link href="#">{
                    user?.profile_photo
                        ?
                        <img
                            className='avater-icon'
                            src={user?.profile_photo}
                            alt=""
                        />
                        :
                        <SvgIcon name="avater" className={'avater-icon'} />
                }

                </Link>
                <Link href="#" className="title-small">{user?.first_name}</Link>
            </div>

            <div className="user-hover-content">
                <div className="user-hover-content-inner">
                    <Link href={homebaseUrl} className="title-small">
                        <SvgIcon name="Home_inactive" className={''} />
                        <SvgIcon name="Home_General" className={''} />
                        Home Base
                    </Link>
                    <Link
                        href=''
                        className="title-small"
                        onClick={handleLogout}
                    >
                        <SvgIcon name="LogOut_General" className={''} />
                        <SvgIcon name="Logout_active" className={''} />
                        Log Out
                    </Link>
                </div>
            </div>
        </div>
    )
}