import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Pagination,
  TextField,
} from "@mui/material";
import DownloadImage from "../assets/images/download.png";
import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Link, Root } from "../extras/types";
import SingleComponent from "../components/SingleComponent";
import FeatureIntro from "../components/FeatureIntro";
import { ColorContext } from "../extras/ColorContext";

const API_BASE_URL = `https://appnor-backend.onrender.com/extras/v1/api/parsing/link-parser?siteUrl=`;
var static_site_url = "";

// const sampleResponse: Root = {
//   message: "success",
//   title:
//     "Start and grow your e-commerce business - 3-Day Free Trial - Shopify USAShopifyShopifyShopify Logo",
//   links: [
//     {
//       text: "Skip to Content",
//       href: "#main",
//     },
//     {
//       text: "Shopify",
//       href: "https://www.shopify.com",
//     },
//     {
//       text: "Start your businessBuild your brand",
//       href: "/start",
//     },
//     {
//       text: "Create your websiteOnline store editor",
//       href: "/website/builder",
//     },
//     {
//       text: "Customize your storeStore themes",
//       href: "https://themes.shopify.com?locale=en",
//     },
//     {
//       text: "Find business appsShopify app store",
//       href: "https://apps.shopify.com/",
//     },
//     {
//       text: "Own your site domainDomains & hosting",
//       href: "/domains",
//     },
//     {
//       text: "Explore free business toolsTools to run your business",
//       href: "/tools",
//     },
//     {
//       text: "Sell your productsSell online or in person",
//       href: "/sell",
//     },
//     {
//       text: "Check out customersWorld-class checkout",
//       href: "/checkout",
//     },
//     {
//       text: "Sell onlineGrow your business online",
//       href: "/online",
//     },
//     {
//       text: "Sell across channelsReach millions of shoppers and boost sales",
//       href: "/channels",
//     },
//     {
//       text: "Sell in personPoint of Sale (POS)",
//       href: "/pos",
//     },
//     {
//       text: "Sell globallyInternational sales",
//       href: "/markets",
//     },
//     {
//       text: "Sell wholesale & directBusiness-to-business (B2B)",
//       href: "/plus/solutions/b2b-ecommerce",
//     },
//     {
//       text: "Accept online paymentsSet up forms of payment",
//       href: "/payments",
//     },
//     {
//       text: "Market your businessReach & retain customers",
//       href: "/market",
//     },
//     {
//       text: "Market across socialSocial media integrations",
//       href: "/facebook-instagram",
//     },
//     {
//       text: "Chat with customersShopify Inbox",
//       href: "/inbox",
//     },
//     {
//       text: "Nurture customersShopify Email",
//       href: "/email-marketing",
//     },
//     {
//       text: "Know your audienceGain customer insights",
//       href: "/segmentation",
//     },
//     {
//       text: "Manage your businessTrack sales, orders & analytics",
//       href: "/manage",
//     },
//     {
//       text: "Measure your performanceAnalytics and Reporting",
//       href: "/analytics",
//     },
//     {
//       text: "Ship orders fasterShopify Shipping",
//       href: "/shipping",
//     },
//     {
//       text: "Manage your stock & ordersInventory & order management",
//       href: "/orders",
//     },
//     {
//       text: "Outsource fulfillment & returnsShopify Fulfillment Network",
//       href: "/fulfillment",
//     },
//     {
//       text: "Get paid fasterShopify Balance",
//       href: "/balance",
//     },
//     {
//       text: "Secure business fundingShopify Capital",
//       href: "/capital",
//     },
//     {
//       text: "Automate your businessShopify Flow",
//       href: "/flow",
//     },
//     {
//       text: "Shopify DevelopersBuild with Shopify's powerful APIs",
//       href: "https://shopify.dev",
//     },
//     {
//       text: "PlusA commerce solution for growing digital brands",
//       href: "/plus",
//     },
//     {
//       text: "EnterpriseThe composable stack for enterprise retail",
//       href: "/commerce-components",
//     },
//     {
//       text: "All ProductsExplore all Shopify products & features",
//       href: "/products",
//     },
//     {
//       text: "Pricing",
//       href: "/pricing",
//     },
//     {
//       text: "Help and supportGet 24/7 support",
//       href: "https://help.shopify.com/en/",
//     },
//     {
//       text: "How-to guidesRead in-depth business guides",
//       href: "/blog/topics/guides",
//     },
//     {
//       text: "Business CoursesLearn from proven experts",
//       href: "https://academy.shopify.com",
//     },
//     {
//       text: "Shopify blogBusiness strategy tips",
//       href: "/blog/",
//     },
//     {
//       text: "What is Shopify?How our commerce platform works",
//       href: "/blog/what-is-shopify",
//     },
//     {
//       text: "Shopify EditionsNew, innovative Shopify products",
//       href: "/editions",
//     },
//     {
//       text: "Founder StoriesLearn from successful merchants",
//       href: "/blog/topics/founder-stories",
//     },
//     {
//       text: "BrandingBuild your brand from scratch",
//       href: "/blog/how-to-build-a-brand",
//     },
//     {
//       text: "MarketingBuild a marketing plan",
//       href: "/blog/marketing-plan",
//     },
//     {
//       text: "Ecommerce SEOImprove your search ranking",
//       href: "/blog/ecommerce-seo-beginners-guide",
//     },
//     {
//       text: "Social media strategyTurn social into sales",
//       href: "/blog/topics/social-media-optimization",
//     },
//     {
//       text: "Business growthScale your business",
//       href: "/blog/how-to-scale-small-business",
//     },
//     {
//       text: "Business name generator",
//       href: "/tools/business-name-generator",
//     },
//     {
//       text: "Logo maker",
//       href: "/tools/logo-maker",
//     },
//     {
//       text: "Stock photography",
//       href: "https://www.shopify.com/stock-photos",
//     },
//     {
//       text: "Business Plan Template",
//       href: "/blog/business-plan-template",
//     },
//     {
//       text: "Link in bio tool",
//       href: "https://linkpop.com/",
//     },
//     {
//       text: "QR code generator",
//       href: "/tools/qr-code-generator",
//     },
//     {
//       text: "ChangelogYour source for recent updates",
//       href: "https://changelog.shopify.com",
//     },
//     {
//       text: "Summer ’23 EditionThe latest 100+ product updates",
//       href: "/editions",
//     },
//     {
//       text: "All EditionsArchive of past Shopify Editions",
//       href: "/editions/all",
//     },
//     {
//       text: "NewsroomAll company news and press releases",
//       href: "https://shopify.com/news",
//     },
//     {
//       text: "Log in",
//       href: "/login",
//     },
//     {
//       text: "Start free trial",
//       href: "https://accounts.shopify.com/store-create?language=en&locale=en&signup_page=https%3A%2F%2Fwww.shopify.com%2F&signup_types[]=paid_trial_experience",
//     },
//     {
//       text: "Start free trial",
//       href: "https://accounts.shopify.com/store-create?language=en&locale=en&signup_page=https%3A%2F%2Fwww.shopify.com%2F&signup_types[]=paid_trial_experience",
//     },
//     {
//       text: "Shopify",
//       href: "https://www.shopify.com",
//     },
//     {
//       text: "Start free trial",
//       href: "https://accounts.shopify.com/store-create?language=en&locale=en&signup_page=https%3A%2F%2Fwww.shopify.com%2F&signup_types[]=paid_trial_experience",
//     },
//     {
//       text: "Start your businessBuild your brand",
//       href: "/start",
//     },
//     {
//       text: "Create your websiteOnline store editor",
//       href: "/website/builder",
//     },
//     {
//       text: "Customize your storeStore themes",
//       href: "https://themes.shopify.com?locale=en",
//     },
//     {
//       text: "Find business appsShopify app store",
//       href: "https://apps.shopify.com/",
//     },
//     {
//       text: "Own your site domainDomains & hosting",
//       href: "/domains",
//     },
//     {
//       text: "Explore free business toolsTools to run your business",
//       href: "/tools",
//     },
//     {
//       text: "Sell your productsSell online or in person",
//       href: "/sell",
//     },
//     {
//       text: "Check out customersWorld-class checkout",
//       href: "/checkout",
//     },
//     {
//       text: "Sell onlineGrow your business online",
//       href: "/online",
//     },
//     {
//       text: "Sell across channelsReach millions of shoppers and boost sales",
//       href: "/channels",
//     },
//     {
//       text: "Sell in personPoint of Sale (POS)",
//       href: "/pos",
//     },
//     {
//       text: "Sell globallyInternational sales",
//       href: "/markets",
//     },
//     {
//       text: "Sell wholesale & directBusiness-to-business (B2B)",
//       href: "/plus/solutions/b2b-ecommerce",
//     },
//     {
//       text: "Accept online paymentsSet up forms of payment",
//       href: "/payments",
//     },
//     {
//       text: "Market your businessReach & retain customers",
//       href: "/market",
//     },
//     {
//       text: "Market across socialSocial media integrations",
//       href: "/facebook-instagram",
//     },
//     {
//       text: "Chat with customersShopify Inbox",
//       href: "/inbox",
//     },
//     {
//       text: "Nurture customersShopify Email",
//       href: "/email-marketing",
//     },
//     {
//       text: "Know your audienceGain customer insights",
//       href: "/segmentation",
//     },
//     {
//       text: "Manage your businessTrack sales, orders & analytics",
//       href: "/manage",
//     },
//     {
//       text: "Measure your performanceAnalytics and Reporting",
//       href: "/analytics",
//     },
//     {
//       text: "Ship orders fasterShopify Shipping",
//       href: "/shipping",
//     },
//     {
//       text: "Manage your stock & ordersInventory & order management",
//       href: "/orders",
//     },
//     {
//       text: "Outsource fulfillment & returnsShopify Fulfillment Network",
//       href: "/fulfillment",
//     },
//     {
//       text: "Get paid fasterShopify Balance",
//       href: "/balance",
//     },
//     {
//       text: "Secure business fundingShopify Capital",
//       href: "/capital",
//     },
//     {
//       text: "Automate your businessShopify Flow",
//       href: "/flow",
//     },
//     {
//       text: "Shopify DevelopersBuild with Shopify's powerful APIs",
//       href: "https://shopify.dev",
//     },
//     {
//       text: "PlusA commerce solution for growing digital brands",
//       href: "/plus",
//     },
//     {
//       text: "EnterpriseThe composable stack for enterprise retail",
//       href: "/commerce-components",
//     },
//     {
//       text: "All ProductsExplore all Shopify products & features",
//       href: "/products",
//     },
//     {
//       text: "Pricing",
//       href: "/pricing",
//     },
//     {
//       text: "Help and supportGet 24/7 support",
//       href: "https://help.shopify.com/en/",
//     },
//     {
//       text: "How-to guidesRead in-depth business guides",
//       href: "/blog/topics/guides",
//     },
//     {
//       text: "Business CoursesLearn from proven experts",
//       href: "https://academy.shopify.com",
//     },
//     {
//       text: "Shopify blogBusiness strategy tips",
//       href: "/blog/",
//     },
//     {
//       text: "What is Shopify?How our commerce platform works",
//       href: "/blog/what-is-shopify",
//     },
//     {
//       text: "Shopify EditionsNew, innovative Shopify products",
//       href: "/editions",
//     },
//     {
//       text: "Founder StoriesLearn from successful merchants",
//       href: "/blog/topics/founder-stories",
//     },
//     {
//       text: "BrandingBuild your brand from scratch",
//       href: "/blog/how-to-build-a-brand",
//     },
//     {
//       text: "MarketingBuild a marketing plan",
//       href: "/blog/marketing-plan",
//     },
//     {
//       text: "Ecommerce SEOImprove your search ranking",
//       href: "/blog/ecommerce-seo-beginners-guide",
//     },
//     {
//       text: "Social media strategyTurn social into sales",
//       href: "/blog/topics/social-media-optimization",
//     },
//     {
//       text: "Business growthScale your business",
//       href: "/blog/how-to-scale-small-business",
//     },
//     {
//       text: "Business name generator",
//       href: "/tools/business-name-generator",
//     },
//     {
//       text: "Logo maker",
//       href: "/tools/logo-maker",
//     },
//     {
//       text: "Stock photography",
//       href: "https://www.shopify.com/stock-photos",
//     },
//     {
//       text: "Business Plan Template",
//       href: "/blog/business-plan-template",
//     },
//     {
//       text: "Link in bio tool",
//       href: "https://linkpop.com/",
//     },
//     {
//       text: "QR code generator",
//       href: "/tools/qr-code-generator",
//     },
//     {
//       text: "ChangelogYour source for recent updates",
//       href: "https://changelog.shopify.com",
//     },
//     {
//       text: "Summer ’23 EditionThe latest 100+ product updates",
//       href: "/editions",
//     },
//     {
//       text: "All EditionsArchive of past Shopify Editions",
//       href: "/editions/all",
//     },
//     {
//       text: "NewsroomAll company news and press releases",
//       href: "https://shopify.com/news",
//     },
//     {
//       text: "Log in",
//       href: "/login",
//     },
//     {
//       text: "Start free trial",
//       href: "https://accounts.shopify.com/store-create?language=en&locale=en&signup_page=https%3A%2F%2Fwww.shopify.com%2F&signup_types[]=paid_trial_experience",
//     },
//     {
//       text: "Start free trial",
//       href: "https://accounts.shopify.com/store-create?language=en&locale=en&signup_page=https%3A%2F%2Fwww.shopify.com%2F&signup_types[]=paid_trial_experience",
//     },
//     {
//       text: " Watch the Shopify story",
//       href: "#/modal/video",
//     },
//     {
//       text: "EnterpriseThe modern, composable stack for enterprise retail",
//       href: "https://www.shopify.com/commerce-components",
//     },
//     {
//       text: "PlusA commerce solution for growing digital brands",
//       href: "/plus",
//     },
//     {
//       text: "PartnersOffer your expertise to Shopify merchants all over the world",
//       href: "/partners",
//     },
//     {
//       text: "DevelopersBuild the future of commerce with Shopify's powerful API",
//       href: "https://shopify.dev",
//     },
//     {
//       text: "Retail storesThe complete system for selling in person",
//       href: "/pos",
//     },
//     {
//       text: "Online Store Builder",
//       href: "/online",
//     },
//     {
//       text: "Theme Store",
//       href: "https://themes.shopify.com?locale=en",
//     },
//     {
//       text: "Shopify App Store",
//       href: "https://apps.shopify.com/",
//     },
//     {
//       text: "Start selling",
//       href: "/sell",
//     },
//     {
//       text: "Seize every sale",
//       href: "/checkout",
//     },
//     {
//       text: "Meet Shopify POS",
//       href: "/pos",
//     },
//     {
//       text: "Leverage our full marketing suite",
//       href: "/market",
//     },
//     {
//       text: "Manage your business",
//       href: "/manage",
//     },
//     {
//       text: "START YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIALSTART YOUR FREE TRIAL",
//       href: "https://accounts.shopify.com/store-create?language=en&locale=en&signup_page=https%3A%2F%2Fwww.shopify.com%2F&signup_types[]=paid_trial_experience",
//     },
//     {
//       text: "BlogGet all the marketing and business strategy tips you need to help you run an online business.Read",
//       href: "/blog/",
//     },
//     {
//       text: "Online CoursesLearn tried-and-tested business tips with instant access to lessons from successful entrepreneurs.Learn",
//       href: "https://www.shopify.com/learn",
//     },
//     {
//       text: "CommunityConnect with a community of brands, partners, and fellow merchants who understand Shopify.Discuss",
//       href: "https://community.shopify.com/c/shopify-community/ct-p/en",
//     },
//     {
//       text: "Help CenterFind answers with a dedicated helpdesk resource full of articles and videos from our Support team.Get help",
//       href: "https://help.shopify.com",
//     },
//     {
//       text: "Start free trial",
//       href: "https://accounts.shopify.com/store-create?language=en&locale=en&signup_page=https%3A%2F%2Fwww.shopify.com%2F&signup_types[]=paid_trial_experience",
//     },
//     {
//       text: "About",
//       href: "/about",
//     },
//     {
//       text: "Careers",
//       href: "/careers",
//     },
//     {
//       text: "Investors",
//       href: "https://investors.shopify.com/home/default.aspx",
//     },
//     {
//       text: "Press and Media",
//       href: "https://shopify.com/news",
//     },
//     {
//       text: "Partners",
//       href: "/partners",
//     },
//     {
//       text: "Affiliates",
//       href: "/affiliates",
//     },
//     {
//       text: "Legal",
//       href: "/legal",
//     },
//     {
//       text: "Service status",
//       href: "https://www.shopifystatus.com/",
//     },
//     {
//       text: "Merchant support",
//       href: "https://help.shopify.com/en/questions",
//     },
//     {
//       text: "Help center",
//       href: "https://help.shopify.com/en/",
//     },
//     {
//       text: "Hire a Partner",
//       href: "https://www.shopify.com/partners/directory",
//     },
//     {
//       text: "Shopify Community",
//       href: "https://community.shopify.com/c/Shopify-Community/ct-p/en?utm_campaign=footer&utm_content=en&utm_medium=web&utm_source=shopify",
//     },
//     {
//       text: "Shopify Events",
//       href: "https://community.shopify.com/c/Shopify-Community/ct-p/en/home?utm_campaign=homepage&utm_content=en&utm_medium=web&utm_source=shopify",
//     },
//     {
//       text: "Shopify.dev",
//       href: "https://shopify.dev",
//     },
//     {
//       text: "API documentation",
//       href: "https://shopify.dev/api",
//     },
//     {
//       text: "Dev Degree",
//       href: "https://devdegree.ca",
//     },
//     {
//       text: "Shop",
//       href: "https://shop.app",
//     },
//     {
//       text: "Shop Pay",
//       href: "/shop-pay",
//     },
//     {
//       text: "Shopify Plus",
//       href: "/plus",
//     },
//     {
//       text: "Shopify Fulfillment Network",
//       href: "/fulfillment",
//     },
//     {
//       text: "Linkpop",
//       href: "https://linkpop.com/",
//     },
//     {
//       text: "Commerce Components",
//       href: "/commerce-components",
//     },
//     {
//       text: "Sustainability",
//       href: "/climate",
//     },
//     {
//       text: "Social impact",
//       href: "/about/social-impact",
//     },
//     {
//       text: "Build Black",
//       href: "https://events.shopify.com/buildblack",
//     },
//     {
//       text: "Build Native",
//       href: "https://buildnative.shop",
//     },
//     {
//       text: "Research",
//       href: "/plus/commerce-trends",
//     },
//     {
//       text: "Online store builder",
//       href: "/online",
//     },
//     {
//       text: "Website builder",
//       href: "/website/builder",
//     },
//     {
//       text: "Ecommerce website",
//       href: "/tour/ecommerce-website",
//     },
//     {
//       text: "USA",
//       href: "https://www.shopify.com",
//     },
//     {
//       text: "Australia",
//       href: "https://www.shopify.com/au",
//     },
//     {
//       text: "Belgium",
//       href: "https://www.shopify.com/be",
//     },
//     {
//       text: "Brasil",
//       href: "https://www.shopify.com/br",
//     },
//     {
//       text: "Canada (English)",
//       href: "https://www.shopify.com/ca",
//     },
//     {
//       text: "Canada (Français)",
//       href: "https://www.shopify.com/ca-fr",
//     },
//     {
//       text: "Colombia",
//       href: "https://www.shopify.com/co",
//     },
//     {
//       text: "Danmark",
//       href: "https://www.shopify.com/dk",
//     },
//     {
//       text: "Deutschland",
//       href: "https://www.shopify.com/de",
//     },
//     {
//       text: "España",
//       href: "https://www.shopify.com/es-es",
//     },
//     {
//       text: "Español (Intl.)",
//       href: "https://www.shopify.com/es",
//     },
//     {
//       text: "France",
//       href: "https://www.shopify.com/fr",
//     },
//     {
//       text: "Hong Kong SAR",
//       href: "https://www.shopify.com/hk-en",
//     },
//     {
//       text: "India",
//       href: "https://www.shopify.com/in",
//     },
//     {
//       text: "Indonesia",
//       href: "https://www.shopify.com/id",
//     },
//     {
//       text: "Ireland",
//       href: "https://www.shopify.com/ie",
//     },
//     {
//       text: "Italia",
//       href: "https://www.shopify.com/it",
//     },
//     {
//       text: "Malaysia",
//       href: "https://www.shopify.com/my",
//     },
//     {
//       text: "México",
//       href: "https://www.shopify.com/mx",
//     },
//     {
//       text: "Nederland",
//       href: "https://www.shopify.com/nl",
//     },
//     {
//       text: "New Zealand",
//       href: "https://www.shopify.com/nz",
//     },
//     {
//       text: "Nigeria",
//       href: "https://www.shopify.com/ng",
//     },
//     {
//       text: "Norway (English)",
//       href: "https://www.shopify.com/no-en",
//     },
//     {
//       text: "Philippines",
//       href: "https://www.shopify.com/ph",
//     },
//     {
//       text: "Singapore",
//       href: "https://www.shopify.com/sg",
//     },
//     {
//       text: "South Africa",
//       href: "https://www.shopify.com/za",
//     },
//     {
//       text: "Sverige",
//       href: "https://www.shopify.com/se",
//     },
//     {
//       text: "United Kingdom",
//       href: "https://www.shopify.com/uk",
//     },
//     {
//       text: "Việt Nam",
//       href: "https://www.shopify.com/vn",
//     },
//     {
//       text: "대한민국",
//       href: "https://www.shopify.com/kr",
//     },
//     {
//       text: "中国",
//       href: "https://www.shopify.cn",
//     },
//     {
//       text: "中國香港特別行政區",
//       href: "https://www.shopify.com/hk",
//     },
//     {
//       text: "台灣",
//       href: "https://www.shopify.com/tw",
//     },
//     {
//       text: "日本",
//       href: "https://www.shopify.com/jp",
//     },
//     {
//       text: "简体中文",
//       href: "https://www.shopify.com/zh",
//     },
//     {
//       text: "USA",
//       href: "https://www.shopify.com",
//     },
//     {
//       text: "Australia",
//       href: "https://www.shopify.com/au",
//     },
//     {
//       text: "Belgium",
//       href: "https://www.shopify.com/be",
//     },
//     {
//       text: "Brasil",
//       href: "https://www.shopify.com/br",
//     },
//     {
//       text: "Canada (English)",
//       href: "https://www.shopify.com/ca",
//     },
//     {
//       text: "Canada (Français)",
//       href: "https://www.shopify.com/ca-fr",
//     },
//     {
//       text: "Colombia",
//       href: "https://www.shopify.com/co",
//     },
//     {
//       text: "Danmark",
//       href: "https://www.shopify.com/dk",
//     },
//     {
//       text: "Deutschland",
//       href: "https://www.shopify.com/de",
//     },
//     {
//       text: "España",
//       href: "https://www.shopify.com/es-es",
//     },
//     {
//       text: "Español (Intl.)",
//       href: "https://www.shopify.com/es",
//     },
//     {
//       text: "France",
//       href: "https://www.shopify.com/fr",
//     },
//     {
//       text: "Hong Kong SAR",
//       href: "https://www.shopify.com/hk-en",
//     },
//     {
//       text: "India",
//       href: "https://www.shopify.com/in",
//     },
//     {
//       text: "Indonesia",
//       href: "https://www.shopify.com/id",
//     },
//     {
//       text: "Ireland",
//       href: "https://www.shopify.com/ie",
//     },
//     {
//       text: "Italia",
//       href: "https://www.shopify.com/it",
//     },
//     {
//       text: "Malaysia",
//       href: "https://www.shopify.com/my",
//     },
//     {
//       text: "México",
//       href: "https://www.shopify.com/mx",
//     },
//     {
//       text: "Nederland",
//       href: "https://www.shopify.com/nl",
//     },
//     {
//       text: "New Zealand",
//       href: "https://www.shopify.com/nz",
//     },
//     {
//       text: "Nigeria",
//       href: "https://www.shopify.com/ng",
//     },
//     {
//       text: "Norway (English)",
//       href: "https://www.shopify.com/no-en",
//     },
//     {
//       text: "Philippines",
//       href: "https://www.shopify.com/ph",
//     },
//     {
//       text: "Singapore",
//       href: "https://www.shopify.com/sg",
//     },
//     {
//       text: "South Africa",
//       href: "https://www.shopify.com/za",
//     },
//     {
//       text: "Sverige",
//       href: "https://www.shopify.com/se",
//     },
//     {
//       text: "United Kingdom",
//       href: "https://www.shopify.com/uk",
//     },
//     {
//       text: "Việt Nam",
//       href: "https://www.shopify.com/vn",
//     },
//     {
//       text: "대한민국",
//       href: "https://www.shopify.com/kr",
//     },
//     {
//       text: "中国",
//       href: "https://www.shopify.cn",
//     },
//     {
//       text: "中國香港特別行政區",
//       href: "https://www.shopify.com/hk",
//     },
//     {
//       text: "台灣",
//       href: "https://www.shopify.com/tw",
//     },
//     {
//       text: "日本",
//       href: "https://www.shopify.com/jp",
//     },
//     {
//       text: "简体中文",
//       href: "https://www.shopify.com/zh",
//     },
//     {
//       text: "Terms of Service",
//       href: "/legal/terms",
//     },
//     {
//       text: "Privacy Policy",
//       href: "/legal/privacy",
//     },
//     {
//       text: "Sitemap",
//       href: "/sitemap",
//     },
//     {
//       text: "Privacy Choices",
//       href: "https://privacy.shopify.com/en",
//     },
//     {
//       text: "Facebook",
//       href: "https://www.facebook.com/shopify",
//     },
//     {
//       text: "Twitter",
//       href: "https://twitter.com/shopify",
//     },
//     {
//       text: "YouTube",
//       href: "https://www.youtube.com/user/shopify",
//     },
//     {
//       text: "Instagram",
//       href: "https://www.instagram.com/shopify/",
//     },
//     {
//       text: "TikTok",
//       href: "https://www.tiktok.com/@shopify",
//     },
//     {
//       text: "LinkedIn",
//       href: "https://www.linkedin.com/company/shopify",
//     },
//     {
//       text: "Pinterest",
//       href: "https://www.pinterest.com/shopify/",
//     },
//   ],
// };

function HomePage(props: any) {
  const colorContex = useContext(ColorContext);
  const [videoUrl, setVideoUrl] = useState("");
  const [inVideoUrl, setInVideoUrl] = useState("");
  const [audioResponse, setAudioResponse] = useState<Link[]>();
  const [playVideo, setPlayVideo] = useState(false);
  const [isTermsAggred, setIsTermsAggred] = useState(true);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const scrollRef = useRef<any>(null);

  const [displayedItems, setDisplayedItems] = useState<Link[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // setIsDownloadSuccess(true);
    // setDisplayedItems(audioResponse.links.slice(0, itemsPerPage));
    return () => {};
  }, []);

  const handlePageChange = (event: any, newPage: any): any => {
    setCurrentPage(newPage);
    setDisplayedItems(
      audioResponse!.slice((newPage - 1) * itemsPerPage, newPage * itemsPerPage)
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): any {
    setVideoUrl(event.target.value);
    if (videoUrl !== "" || videoUrl.includes("youtu")) {
      //setPlayVideo(true);
    } else {
      setPlayVideo(false);
    }
  }

  function mimicDownload() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.includes("instagram")) {
      alert("A Valid Facebook Video URL is Required!!");
      return;
    }

    handleOpen();
    //setAudioResponse(sampleResponse.links);
    setIsDownloadSuccess(true);
    setPlayVideo(true);
    setInVideoUrl(videoUrl);
    setTimeout(() => {
      handleClose();
      setVideoUrl("");
    }, 5000);
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
    //setPlayVideo(checked);
  }

  function fetchDownloadableLink(): void {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.startsWith("https://www")) {
      alert("A Valid Website URL [https://www] is Required!!");
      return;
    }
    handleOpen();
    axios.post<Root>(API_BASE_URL + videoUrl).then(
      (result) => {
        console.log("Hitting Website Parser  API is successful");
        setAudioResponse(result.data.links);
        setPlayVideo(true);
        setInVideoUrl(videoUrl);
        if (result.data.links.length === 0) {
          alert(
            "Unable to parse this website due to captcha protected or some other issues..."
          );
          handleClose();
          return;
        }

        setDisplayedItems(result.data.links.slice(0, itemsPerPage));
        setIsDownloadSuccess(true);
        setTimeout(() => {
          handleClose();
          setVideoUrl("");
        }, 5000);
      },
      (error) => {
        console.log("Something went wrong while hitting data.." + error);
        handleClose();
        alert("Something went wrong while hitting data.. [" + error + " ]");
      }
    );
  }

  function handleVideoPlay(): any {
    if (videoUrl === "" || !videoUrl.startsWith("https://")) {
      alert("A Valid Website URL is Required!!");
      return;
    }
    window.open(videoUrl, "_blank");
  }

  function openLink(audioUrl: string): any {
    if (audioUrl === "" || audioUrl.length < 20) {
      alert("Something went wrong while generating download link, try again..");
      return;
    }
    window.open(audioUrl, "_blank");
  }

  function scrollToDiv() {
    if (colorContex.color === "white") {
      return;
    }
    scrollRef.current.scrollIntoView();
  }

  const backdrop = (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <h1 className="font-extrabold m-2 text-white text-xl">
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  return (
    <div
      ref={scrollRef}
      className="md:m-10 sm:m-5 flex flex-col items-center justify-center"
    >
      {backdrop}
      <FeatureIntro
        heading=" Unleash the Power of Link Sleuthing"
        desc="Tired of manually hunting for links?  Unlock the hidden web with our effortless link-scraping solution! Simply paste any URL and watch our tool uncover every link with lightning speed!⚡️Discover hidden gems, boost SEO research, track backlinks, and more – all with a few clicks!"
      />
      <div className="flex flex-col items-center border shadow-lg p-4">
        <TextField
          fullWidth
          value={videoUrl}
          onChange={handleChange}
          id="url-input"
          label="Enter Website Link To Scrap"
          variant="outlined"
        />
        <Button
          onClick={fetchDownloadableLink}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Scrap Link
        </Button>
        <Button
          onClick={handleVideoPlay}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Visit Website
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          Scrapped data will get presented in List based UI format or if data is
          condensed then expect raw json.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            defaultChecked
          />
          <h3 className="text-xs text-center m-2">
            By scrapping 3rd party websites you agree to our terms & conditions
            for fair usages policy
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4 mb-8">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">Link Scrapping Successful</h3>
            <img
              className="m-2"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
            <img
              className="animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-4">
        {isDownloadSuccess &&
          displayedItems!.map((link, index) => {
            return (
              <SingleComponent
                key={index}
                url={inVideoUrl}
                text={link.text}
                href={link.href}
              />
            );
          })}
      </div>

      {isDownloadSuccess && (
        <Pagination
          page={currentPage}
          onChange={handlePageChange}
          className="mt-8 border p-3 border-blue-600"
          count={Math.ceil(audioResponse!.length / 10)}
          variant="outlined"
          color="primary"
        />
      )}
    </div>
  );
}

export default HomePage;
