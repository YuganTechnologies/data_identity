//External Lib Import

import { RiDashboardLine } from "react-icons/ri";

import { useTranslation } from "react-i18next";

const MenuItems = () => {
  const { t } = useTranslation();



  return [
    { key: "navigation", label: t("Admin Routes"), isTitle: true },
    {
      key: "Dashboard",
      label: t("Data Collection Form"),
      url: "/dashboard",
      isTitle: false,
      icon: <RiDashboardLine className="side-bar-item-icon" />,
    },





  ];
};


export default MenuItems;
