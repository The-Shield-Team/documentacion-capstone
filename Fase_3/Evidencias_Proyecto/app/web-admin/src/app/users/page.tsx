import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableProfiles from "@/components/Tables/TableProfiles";

export const metadata: Metadata = {
  title: "HIR - Users",
  description:
    "HIR - Users",
};

const UsersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Usuarios" />

      <div className="flex flex-col gap-10">
        <TableProfiles />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
