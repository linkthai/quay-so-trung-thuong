import React from "react";
import Head from "next/head";

export function DefaultHead() {
  return (
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0"
      />
      <link rel="icon" href="/favicon.ico" />
      <link
        href="/fonts/SVN-Desire.otf"
        rel="preload"
        as="font"
        crossOrigin=""
      />
      <link
        href="/fonts/SVN-Gotham Bold.ttf"
        rel="preload"
        as="font"
        crossOrigin=""
      />
      <link
        href="/fonts/SVN-Gotham Book.ttf"
        rel="preload"
        as="font"
        crossOrigin=""
      />
      <link
        href="/fonts/SVN-Gotham Regular.ttf"
        rel="preload"
        as="font"
        crossOrigin=""
      />
      <link
        href="/fonts/SVN-Gotham Ultra.ttf"
        rel="preload"
        as="font"
        crossOrigin=""
      />
      <link
        href="/fonts/SVN-Helves.ttf"
        rel="preload"
        as="font"
        crossOrigin=""
      />
      <link
        href="/fonts/SVN-MORVA.ttf"
        rel="preload"
        as="font"
        crossOrigin=""
      />
      <script async defer src="/assets/js/iframe_api.js"></script>
    </Head>
  );
}
