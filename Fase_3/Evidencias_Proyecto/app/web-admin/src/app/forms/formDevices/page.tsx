import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import DevicesFormCreate from "@/components/FormElements/deviceFormCreate";

export const metadata: Metadata = {
  title: "HIR - Devices",
  description:
    "HIR - Devices",
};

const FormDevicesCreate = () => {

  return (
    <DevicesFormCreate  />
  );
};

export default FormDevicesCreate;
