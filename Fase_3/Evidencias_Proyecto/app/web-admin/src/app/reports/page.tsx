import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableReportsClient from "@/components/Tables/TableReports";

const ReportsPage = async () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Reportes" />
      <div className="flex flex-col gap-10">
        <TableReportsClient />
      </div>
    </DefaultLayout>
  );

};

export default ReportsPage;