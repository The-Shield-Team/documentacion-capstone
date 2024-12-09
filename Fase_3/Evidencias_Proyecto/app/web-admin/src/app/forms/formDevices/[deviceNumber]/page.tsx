import { Metadata } from "next";
import DevicesFormUpdate from "@/components/FormElements/deviceFormUpdate";

export const metadata: Metadata = {
  title: "HIR - Devices",
  description:
    "HIR - Devices",
};

const FormDevicesUpdate = async ({ params }: { params: { deviceNumber: string } }) => {
  const { deviceNumber } = params;

  try {
    return <DevicesFormUpdate deviceNumber={deviceNumber}/>;
  } catch (error) {
    return <div>Error al cargar los datos. Por favor, intenta nuevamente.</div>;
  }
};

export default FormDevicesUpdate;
