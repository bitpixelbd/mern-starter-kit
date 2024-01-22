import Link from 'next/link';
import React from 'react';

const BottomFooter = () => {
    return (
      <div className="ps-footer__copyright">
        <p>© 2021 Martfury. All Rights Reserved</p>
        <p>
          <span>We Using Safe Payment For:</span>
          <Link href="https://nouthemes.net/html/martfury/index.html#">
            <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/1(6).jpg" alt="" />
          </Link>
          <Link href="https://nouthemes.net/html/martfury/index.html#">
            <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/2(6).jpg" alt="" />
          </Link>
          <Link href="https://nouthemes.net/html/martfury/index.html#">
            <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/3(6).jpg" alt="" />
          </Link>
          <Link href="https://nouthemes.net/html/martfury/index.html#">
            <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/4(5).jpg" alt="" />
          </Link>
          <Link href="https://nouthemes.net/html/martfury/index.html#">
            <img src="./Martfury - Multipurpose Marketplace HTML5 Template + Admin Template_files/5(5).jpg" alt="" />
          </Link>
        </p>
      </div>
    );
};

export default BottomFooter;