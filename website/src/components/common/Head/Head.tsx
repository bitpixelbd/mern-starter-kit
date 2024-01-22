import React, { ReactNode } from "react";
import Head from "next/head";
import { BASE_URL } from "../../../config/config";
import {
	metaDesc,
	metaKeywords,
	metaSiteTitle,
} from "../../../config/defaultMetaConfig";
import useGetSetting from "@/hooks/useGetSetting";

interface CustomHeadProps {
	title?: string;
	metaTitle?: string;
	description?: string;
	keywords?: string;
	author?: string;
	url?: string;
	type?: string;
	image?: string;
	children?: ReactNode;
}

export const CustomHead = ({
	title = "",
	metaTitle = "",
	description = "",
	keywords = "",
	author = "",
	url = "",
	type = "",
	image = "",
	children,
}: any) => {
	title = title ? title : metaSiteTitle;
	metaTitle = metaTitle ? metaTitle : metaSiteTitle;
	description = description ? description : metaDesc;
	keywords = keywords ? keywords : metaKeywords;
	author = author ? author : "On Party";
	url = url ? url : BASE_URL;
	type = type || "website";
	image = image || BASE_URL + "/logo.png";

	const {settingsData} = useGetSetting()

	const faviconUrl = settingsData?.favicon;


	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			
			<link rel="shortcut icon" href={faviconUrl} />
			<link rel="icon" type="image/x-icon" href={faviconUrl} />
			<link
				href="https://fonts.cdnfonts.com/css/sf-ui-display"
				rel="stylesheet"
			/>

			{children}
		</Head>
	);
};
