import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrganizationForm from "@/components/FormElements/organizationForm";

export const metadata: Metadata = {
  title: "HIR - Organization",
  description:
    "HIR - Organization",
};

const OrganizationSettingsPage = () => {
  return (
    <DefaultLayout>
      <OrganizationForm />
    </DefaultLayout>
  );
};

export default OrganizationSettingsPage;
