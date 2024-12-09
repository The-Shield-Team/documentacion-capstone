import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Next.js Form Elements | HIR - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for HIR - Next.js Tailwind CSS Admin Dashboard Template",
};

const ProfileSettingsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

export default ProfileSettingsPage;
