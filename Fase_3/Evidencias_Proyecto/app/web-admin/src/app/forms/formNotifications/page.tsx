import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import NotificationsFormCreate from "@/components/FormElements/notificationFormCreate";

export const metadata: Metadata = {
  title: "HIR - Notifications",
  description:
    "HIR - Notifications",
};

const FormNotificationsCreate = () => {

  return (
    <NotificationsFormCreate  />
  );
};

export default FormNotificationsCreate;
