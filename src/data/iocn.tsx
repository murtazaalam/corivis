import XIcon from "@mui/icons-material/X";
import AppleIcon from "@mui/icons-material/Apple";
import RedditIcon from "@mui/icons-material/Reddit";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import DevicesIcon from "@mui/icons-material/Devices";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import ser1 from "@/assets/home/ser1.jpg";
import ser2 from "@/assets/home/ser2.jpg";
import ser3 from "@/assets/home/ser3.jpg";
import ser4 from "@/assets/home/ser4.jpg";
import ser5 from "@/assets/home/ser5.jpg";
import ser6 from "@/assets/home/ser6.jpg";

import securityIcon from "@/assets/icon/Security First.png";
import supportIcon from "@/assets/icon/Reliable Support.png";
import agileIcon from "@/assets/icon/Agile & Transparent.png";
import automationIcon from "@/assets/icon/Automation Driven.png";
import microsoftIcon from "@/assets/icon/Microsoft Expertise.png";
import enterpriseIcon from "@/assets/icon/Enterprise Focused.png";

import buildIcon from "@/assets/icon/Build.png";
import assessIcon from "@/assets/icon/Assess.png";
import designIcon from "@/assets/icon/Design.png";
import optimizeIcon from "@/assets/icon/Optimize.png";


export const socialLink = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/corivis/",
    icon: <LinkedInIcon />,
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/dodo369",
    icon: "dribbble",
  },
  {
    label: "X",
    href: "https://x.com/CorivisLLP",
    icon: <XIcon />,
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/user/Corivis-Engineering/",
    icon: <RedditIcon />,
  },
  {
    label: "Medium",
    href: "https://medium.com/@corivis",
    icon: "medium",
  }
];

export const featureList = [
  {
    image: microsoftIcon,
    title: "Microsoft Expertise",
    description: "Deep capabilities across the Microsoft ecosystem.",
  },
  {
    image: enterpriseIcon,
    title: "Enterprise Focused",
    description: "Proven experience delivering solutions for enterprises.",
  },
  {
    image: securityIcon,
    title: "Security First",
    description: "Built with security, compliance, and governance at the core.",
  },
  {
    image: automationIcon,
    title: "Automation Driven",
    description: "Optimizing processes through intelligent automation.",
  },
  {
    image: agileIcon,
    title: "Agile & Transparent",
    description: "Collaborative engagement with clear communication.",
  },
  {
    image: supportIcon,
    title: "Reliable Support",
    description: "24×7 support and managed services you can trust.",
  },
];

export const stepList = [
  {
    step_number: "01",
    image: assessIcon,
    title: "Assess",
    description:
      "We understand your business, challenges, and objectives.",
  },
  {
    step_number: "02",
    image: designIcon,
    title: "Design",
    description:
      "We architect secure, scalable, and future-ready solutions.",
  },
  {
    step_number: "03",
    image: buildIcon,
    title: "Build",
    description:
      "We implement with best practices, automation, and quality.",
  },
  {
    step_number: "04",
    image: optimizeIcon,
    title: "Optimize",
    description:
      "We continuously improve and support to maximize value.",
  },
];

export const serviceList = [
  {
    slug: "apple-device-management",
    tab_icon: AppleIcon,
    tab_label: "Apple Device Management",
    badges: ["macOS", "iOS", "iPadOS"],
    title: "Apple Device Management",
    description:
      "Apple Business Manager (ABM), Jamf Pro, Microsoft Intune for macOS, iOS/iPadOS management, compliance, application deployment, and zero-touch Apple device provisioning.",
    brochure_href: "/brochures/apple-device-management.pdf",
    image_src: ser1,
    image_caption: "Apple MDM",
  },
  {
    slug: "microsoft-azure",
    tab_icon: CloudQueueIcon,
    tab_label: "Microsoft Azure",
    badges: ["IaaS", "PaaS", "Landing Zones"],
    title: "Microsoft Azure Cloud",
    description:
      "Azure landing zones, governance, workload migration, cost optimization, and secure-by-design infrastructure built for scale.",
    brochure_href: "/brochures/microsoft-azure.pdf",
    image_src: ser2,
    image_caption: "Azure Cloud",
  },
  {
    slug: "microsoft-365",
    tab_icon: Grid3x3Icon,
    tab_label: "Microsoft 365",
    badges: ["Teams", "SharePoint", "Exchange"],
    title: "Microsoft 365 Workplace",
    description:
      "Modern workplace enablement across Teams, SharePoint, and Exchange Online — deployed, secured, and adopted the right way.",
    brochure_href: "/brochures/microsoft-365.pdf",
    image_src: ser3,
    image_caption: "M365 Suite",
  },
  {
    slug: "microsoft-intune",
    tab_icon: DevicesIcon,
    tab_label: "Microsoft Intune",
    badges: ["MDM", "MAM", "Compliance"],
    title: "Microsoft Intune",
    description:
      "Unified endpoint management across Windows, macOS, iOS, and Android — enrollment, compliance policies, and app protection.",
    brochure_href: "/brochures/microsoft-intune.pdf",
    image_src: ser4,
    image_caption: "Intune UEM",
  },
  {
    slug: "microsoft-entra-id",
    tab_icon: VerifiedUserIcon,
    tab_label: "Microsoft Entra ID",
    badges: ["SSO", "Conditional Access", "MFA"],
    title: "Microsoft Entra ID",
    description:
      "Identity and access management with conditional access, SSO, and zero-trust security policies across your organization.",
    brochure_href: "/brochures/microsoft-entra-id.pdf",
    image_src: ser5,
    image_caption: "Entra ID",
  },
  {
    slug: "managed-support",
    tab_icon: SupportAgentIcon,
    tab_label: "Managed Support",
    badges: ["24×7", "SLA-backed", "Proactive"],
    title: "Managed Support Services",
    description:
      "Round-the-clock monitoring, incident response, and proactive maintenance backed by clear SLAs and a dedicated team.",
    brochure_href: "/brochures/managed-support.pdf",
    image_src: ser6,
    image_caption: "24×7 Support",
  },
];