import { Device, DeviceStatusEnum } from "@/types/device.type";

const TableDashboardDevices = (props: { devices: Device[]; }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
          Equipos Recientes
        </h4>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Nombre
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Fecha Creación
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {props.devices.slice(0, 7).map((device: Device, key: number) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {device.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(device.created_at).toISOString().split('T')[0]}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${device.status === DeviceStatusEnum.available
                      ? "bg-success text-success"
                      : device.status === DeviceStatusEnum.unavailable
                        ? "bg-danger text-danger"
                        : device.status === DeviceStatusEnum.deleted
                          ? "bg-purple-600 text-purple-700"
                          : "bg-warning text-warning"
                      }`}
                  >
                    {device.status === DeviceStatusEnum.available
                      ? "Disponible"
                      : device.status === DeviceStatusEnum.unavailable
                        ? "Inhabilitado"
                        : device.status === DeviceStatusEnum.deleted
                          ? "Eliminado"
                          : "Ocupado"
                    }
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDashboardDevices;
