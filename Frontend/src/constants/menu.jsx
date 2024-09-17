//External Lib Import

import { RiDashboardLine, RiEdit2Fill } from "react-icons/ri";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MenuItems = () => {
  const { t } = useTranslation();
  const { role } = useSelector((state) => state.User);

  return [
    { key: "navigation", label: t("Admin Routes"), isTitle: true },
    {
      key: "Dashboard",
      label: t("Data Collection Form"),
      url: "/dashboard",
      isTitle: false,
      icon: <RiDashboardLine className="side-bar-item-icon" />,
    },
    role === "ADMIN" && {
      key: "Add_Student",
      label: t("Add Missing ID(SIN)"),
      url: "/add-student",
      isTitle: false,
      icon: <RiEdit2Fill className="side-bar-item-icon" />,
    },
  ];
};

export default MenuItems;
