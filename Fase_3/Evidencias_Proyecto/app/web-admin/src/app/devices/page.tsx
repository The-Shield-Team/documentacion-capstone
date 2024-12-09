import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableDevicesClient from "@/components/Tables/TableDevices";

const TableDevices = async () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Equipos" />
      <div className="flex flex-col gap-10">
        <TableDevicesClient />
      </div>
    </DefaultLayout>
  );

};

export default TableDevices;