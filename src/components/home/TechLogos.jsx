import LogoLoop from '../ui/logo-loop.jsx';

import { SiAmazon, SiGoogle, SiMeta, SiApple, SiNvidia, SiAdobe, SiCisco, SiNetflix, SiStripe } from 'react-icons/si';
import { SiAtlassian, SiOracle, SiGithub, SiAirbnb, SiSpotify, SiSalesforce } from 'react-icons/si';
import { FaMicrosoft } from "react-icons/fa";

const techLogos = [
  { node: <SiAmazon />, title: "Amazon", href: "https://www.amazon.com" },
  { node: <SiGoogle />, title: "Google", href: "https://about.google/" },
  { node: <SiMeta />, title: "Meta", href: "https://www.meta.com/" },
  { node: <FaMicrosoft />, title: "Microsoft", href: "https://www.microsoft.com" },
  { node: <SiApple />, title: "Apple", href: "https://www.apple.com" },
  { node: <SiNvidia />, title: "NVIDIA", href: "https://www.nvidia.com" },
  { node: <SiAdobe />, title: "Adobe", href: "https://www.adobe.com" },
  { node: <SiCisco />, title: "Cisco", href: "https://www.cisco.com" },
  { node: <SiNetflix />, title: "Netflix", href: "https://www.netflix.com" },
  { node: <SiStripe />, title: "Stripe", href: "https://stripe.com" },
  { node: <SiAtlassian />, title: "Atlassian", href: "https://www.atlassian.com" },
  { node: <SiOracle />, title: "Oracle", href: "https://www.oracle.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiAirbnb />, title: "Airbnb", href: "https://www.airbnb.com" },
  { node: <SiSpotify />, title: "Spotify", href: "https://www.spotify.com" },
  { node: <SiSalesforce />, title: "Salesforce", href: "https://www.salesforce.com" },
];



function TechLogos() {
  return (
    <div className="relative w-full overflow-hidden text-slate-500">
      <LogoLoop
        logos={techLogos}
        speed={40}
        direction="right"
        width="100%"
        logoHeight={40}
        gap={88}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#0d1727"
        ariaLabel="Technology company logos"
        className="w-full text-slate-500"
      />
    </div>
  );
}

export default TechLogos;
