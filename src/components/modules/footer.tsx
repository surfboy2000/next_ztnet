import React from "react";
import { globalSiteVersion } from "~/utils/global";

const Footer = () => (
  <footer className="hidden px-4 py-6 sm:block">
    <div className="grid grid-cols-3">
      <div></div>
      <p className="text-center text-sm text-gray-600">
        © SDWAN Solutions {new Date().getFullYear()}. All rights reserved
        <a href="http://www.ipv6next.cn">
          {" "}
          by  @ipv6next
        </a>
      </p>
      {globalSiteVersion ? (
        <p className="text-right text-sm text-gray-600">{globalSiteVersion}</p>
      ) : (
        <div></div>
      )}
    </div>
  </footer>
);

export default Footer;
