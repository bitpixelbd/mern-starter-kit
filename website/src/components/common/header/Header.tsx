import React, { useEffect, useState } from "react";
import TopHead from "@/components/common/header/TopHead";
import BottomHead from "@/components/common/header/BottomHead";

export default function Header() {

	return (
		<div className="headerMainWrapper">
			<TopHead />
			<BottomHead />
		</div>
	);
}
