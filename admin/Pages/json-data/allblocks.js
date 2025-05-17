/* eslint-disable no-unused-vars */
import { alert, animationIcon, buttonGroupIcon, buttonIcon, cardIcon, chartIcon, columnsIcon, containerIcon, countdownIcon, countersIcon, featureBoxIcon, flipBoxIcon, galleryIcon, gifIcon, hIcon, iconBoxIcon, imageCompareIcon, infoBoxIcon, lottieIcon, mailIcon, posts, priceListIcon, pricingTableIcon, qrCodeIcon, ratingIcon, row, rowIcon, servicesIcon, shapeDivider, sliderIcon, socialShareIcon, teamMembersIcon, viewer } from "../../utils/icons";

const pluginSlug = 'b-blocks/';


const siteURL = 'https://bblockswp.com/';
const docsURL = `${siteURL}docs/`;

const imbCompareDocs = `${docsURL}image-comparison-block/`;

// demo link 
const demoLink = "https://bblockswp.com/demo"

export const blocks = [
  {
    name: `${pluginSlug}team-members`,
    title: "Team Members",
    icon: teamMembersIcon, // Keep this as a React element
    demo: "",
    docs: `${docsURL}team-members`
  },
  {
    name: `${pluginSlug}star-rating`,
    title: "Star Rating",
    icon: ratingIcon, // Keep this as a React element
    demo: "",
    docs: ""
  },
  {
    name: `${pluginSlug}social-share`,
    title: "Social Share",
    icon: socialShareIcon, // Keep this as a React element
    demo: `${demoLink}/social-share`,
    docs: `${docsURL}social-share-block`
  },
  {
    name: `${pluginSlug}slider`,
    title: "Slider",
    icon: sliderIcon, // Keep this as a React element
    demo: `${demoLink}/slider`,
    docs: ""
  },
  {
    name: `${pluginSlug}shape-divider`,
    title: "Shape Divider",
    icon: shapeDivider, // Keep this as a React element
    demo: "",
    docs: `${docsURL}services-section-block`
  },
  {
    name: `${pluginSlug}services`,
    title: "Services",
    icon: servicesIcon, // Keep this as a React element
    demo: `${demoLink}/services-section`,
    docs: ""
  },
  {
    name: `${pluginSlug}section-heading`,
    title: "Section Heading",
    icon: hIcon, // Keep this as a React element
    demo: `${demoLink}/section-heading`,
    docs: ""
  },
  {
    name: `${pluginSlug}row`,
    title: "Row",
    icon: rowIcon, // Keep this as a React element
    demo: `${demoLink}/row`,
    docs: ""
  },
  {
    name: `${pluginSlug}qr-code`,
    title: "Qr Code",
    icon: qrCodeIcon, // Keep this as a React element
    demo: `${demoLink}/qr-code`,
    docs: `${docsURL}qr-code-block`
  },
  {
    name: `${pluginSlug}pricing-table`,
    title: "Pricing Table",
    icon: pricingTableIcon, // Keep this as a React element
    demo: `${demoLink}/pricing-table`,
    docs: `${docsURL}pricing-table-block`
  },
  {
    name: `${pluginSlug}price-lists`,
    title: "Price Lists",
    icon: priceListIcon, // Keep this as a React element
    demo: `${demoLink}/price-lists`,
    docs: ""
  },
  {
    name: `${pluginSlug}posts`,
    title: "Posts",
    icon: posts, // Keep this as a React element
    demo: `${demoLink}/posts`,
    docs: ""
  },
  {
    name: `${pluginSlug}mailto`,
    title: "Mail To",
    icon: mailIcon, // Keep this as a React element
    demo: `${demoLink}/mail-to`,
    docs: `${docsURL}mail-to-block`
  },
  {
    name: `${pluginSlug}lottie-player`,
    title: "Lottie Player",
    icon: lottieIcon, // Keep this as a React element
    demo: `${demoLink}/info-box`,
    docs: ""
  },
  {
    name: `${pluginSlug}info-box`,
    title: "Info Box",
    icon: infoBoxIcon, // Keep this as a React element
    demo: `${demoLink}/info-box`,
    docs: ""
  },
  {
    name: `${pluginSlug}image-gallery`,
    title: "Image Gallery",
    icon: galleryIcon, // Keep this as a React element
    demo: `${demoLink}/image-gallery`,
    docs: ""
  },
  {
    name: `${pluginSlug}image-comparison`,
    title: "Image Comparison",
    icon: imageCompareIcon, // Keep this as a React element
    demo: `${demoLink}/image-comparison`,
    docs: ""
  },
  {
    name: `${pluginSlug}icon-box`,
    title: "Icon Box",
    icon: iconBoxIcon, // Keep this as a React element
    demo: `${demoLink}/icon-list`,
    docs: ""
  },
  {
    name: `${pluginSlug}gif`,
    title: "Gif Image",
    icon: gifIcon, // Keep this as a React element
    demo: `${demoLink}/gig-image`,
    docs: `${docsURL}gif-block/`
  },
  {
    name: `${pluginSlug}flip-boxes`,
    title: "Flip Boxes",
    icon: flipBoxIcon, // Keep this as a React element
    demo: `${demoLink}/flip-boxes`,
    docs: "",
  },
  {
    name: `${pluginSlug}feature-boxes`,
    title: "Feature Boxes",
    icon: featureBoxIcon, // Keep this as a React element
    demo: `${demoLink}/feature-boxes`,
    docs: "",
  },
  {
    name: `${pluginSlug}counters`,
    title: "Counters",
    icon: countersIcon, // Keep this as a React element
    demo: `${demoLink}/countdown`,
    docs: `${docsURL}counters-block`,
  },
  {
    name: `${pluginSlug}countdown`,
    title: "CountDown",
    icon: countdownIcon, // Keep this as a React element
    demo: `${demoLink}/countdown`,
    docs: `${docsURL}countdown-block`,
  },
  {
    name: `${pluginSlug}container`,
    title: "Container",
    icon: containerIcon, // Keep this as a React element
    demo: "",
    docs: "",
  },
  {
    name: `${pluginSlug}column`,
    title: "Column",
    icon: columnsIcon, // Keep this as a React element
    demo: "",
    docs: "",
  },
  {
    name: `${pluginSlug}chart`,
    title: "Chart",
    icon: chartIcon, // Keep this as a React element
    demo: `${demoLink}/chart`,
    docs: `${docsURL}chart-block`,
  },
  {
    name: `${pluginSlug}cards`,
    title: "Cards",
    icon: cardIcon, // Keep this as a React element
    demo: `${demoLink}/cards`,
    docs: "",
  },
  {
    name: `${pluginSlug}button`,
    title: "Button",
    icon: buttonIcon, // Keep this as a React element
    demo: `${demoLink}/button`,
    docs: "",
  },
  {
    name: `${pluginSlug}button-group`,
    title: "Button Group",
    icon: buttonGroupIcon, // Keep this as a React element
    demo: `${demoLink}/button-group`,
    docs: "",
  },
  {
    name: `${pluginSlug}animated-text`,
    title: "Animated Text",
    icon: animationIcon, // Keep this as a React element
    demo: `${demoLink}/animated-text`,
    docs: `${docsURL}animated-text-block`,
  },
  {
    name: `${pluginSlug}alert`,
    title: "Alert",
    icon: alert, // Keep this as a React element
    demo: `${demoLink}/alert`,
    docs: `${docsURL}alert-block`,
  },

  {
    name: `${pluginSlug}td-viewer`,
    title: "3D Viewer",
    icon: viewer,
    demo: `${demoLink}/3d-viewer`,
    docs: `${docsURL}3d-viewer-block`,
  },

];
