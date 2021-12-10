import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { SITE_NAME } from "../../utils/constants";

interface Props {
    title?: string;
    description?: string;
    keywords?: string[];
}

export const CustomHead: NextPage<Props> = ({
    title,
}) => {
    return (
        <Head>
            { title ? <title>{title} - {SITE_NAME}</title> : <title>{SITE_NAME}</title>}
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" type="image/png" href="/logo.png" />
        </Head>
    )
}