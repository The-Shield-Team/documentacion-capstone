import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableNotificationsClient from "@/components/Tables/TableNotifications";

const NotificationsPage = async () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Notficaciones" />
      <div className="flex flex-col gap-10">
        <TableNotificationsClient />
      </div>
    </DefaultLayout>
  );

};

export default NotificationsPage;