import { type IconType } from "react-icons";
import {
  MdDashboard,
  MdOutlineSettings,
  MdNotificationsNone,
} from "react-icons/md";

interface IPath {
  title: string;
  path: string;
  Icon: IconType;
}

export const PATHS: IPath[] = [
  {
    title: "Boards",
    path: "/boards",
    Icon: MdDashboard,
  },
  {
    title: "Notifications",
    path: "/notifications",
    Icon: MdNotificationsNone,
  },
  {
    title: "Settings",
    path: "/settings",
    Icon: MdOutlineSettings,
  },
];
