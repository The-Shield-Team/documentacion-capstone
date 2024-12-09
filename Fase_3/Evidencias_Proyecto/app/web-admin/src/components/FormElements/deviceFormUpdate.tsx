'use client';

import { useState, useEffect, FormEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import axios from "axios";
import { DeviceStatusEnum, DeviceTypeEnum } from "@/types/device.type";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';

const createApiClient = () => {
  const authToken = sessionStorage.getItem("authdata");
  if (!authToken) {
    console.error("No se encontró el token de autorización.");
    alert("No se pudo autenticar la solicitud. Por favor, inicia sesión nuevamente.");
    window.location.href = "/login";
    throw new Error("Token no disponible");
  }

  return axios.create({
    baseURL: supabaseUrl,
    headers: {
      'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });
};

// Obtener dispositivo específico
const fetchDevice = async (deviceNumber: string) => {
  try {
    const api = createApiClient();
    const response = await api.get(`/devices`, {
      params: {
        select: `*, rooms(floor, id)`,
        id: `eq.${deviceNumber}`,
      },
    });
    return response.data[0] || null;
  } catch (e) {
    console.error("Error al obtener el dispositivo:", e);
    return null;
  }
};

// Obtener pisos
const fetchFloors = async () => {
  try {
    const api = createApiClient();
    const response = await api.get(`/floors`, {
      params: {
        select: `id, rooms(id)`,
      },
    });
    return response.data || [];
  } catch (e) {
    console.error("Error al obtener los pisos:", e);
    return [];
  }
};

// Manejo del envío del formulario
const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const id = formData.get('id');
  const status = formData.get('status') as string;
  const observations = formData.get('observations') as string;

  try {
    const api = createApiClient();
    const response = await api.patch(
      `/devices`,
      { status, observations },
      {
        params: {
          id: `eq.${id}`,
        },
      }
    );

    if (response.status === 204) {
      console.log('Dispositivo actualizado correctamente.');
      window.location.href = "/devices";
    } else {
      console.error('Error al actualizar el dispositivo:', response.data);
      window.alert('Hubo un error al actualizar el dispositivo.');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    window.alert('Hubo un error en la solicitud.');
  }
};

const DevicesFormUpdate = ({ deviceNumber }: { deviceNumber: string }) => {
  const [deviceData, setDeviceData] = useState<any>(null);
  const [floorsData, setFloorsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos del dispositivo y pisos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const device = await fetchDevice(deviceNumber);
        const floors = await fetchFloors();
        setDeviceData(device);
        setFloorsData(floors);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deviceNumber]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!deviceData) {
    return <p>No se encontraron datos del dispositivo.</p>;
  }

  const allDevicesTypes: DeviceTypeEnum[] = Object.values(DeviceTypeEnum).filter(
    (type) => type !== deviceData.type
  );

  const allDevicesStatus: DeviceStatusEnum[] = Object.values(DeviceStatusEnum).filter(
    (status) => status !== deviceData.status
  );

  const allFloors: string[] = floorsData.map((floor) => floor.id).filter((floor) => {
    return floor !== deviceData.rooms?.floor;
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar Dispositivo" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Editar dispositivo #{deviceData.id}
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="p-6.5">
                <input type="hidden" name="id" value={deviceData.id} />

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nombre
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={deviceData.name}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      selectName="Tipo"
                      options={[deviceData.type, ...allDevicesTypes]}
                      isDisabled
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      selectName="Piso"
                      options={[deviceData.rooms?.floor, ...allFloors]}
                      isDisabled
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      selectName="Ubicación"
                      options={[deviceData.rooms?.id]}
                      isDisabled
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <SelectGroupOne
                    selectName="Estado"
                    options={[deviceData.status, ...allDevicesStatus]}
                    nameVal="status"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Observaciones
                  </label>
                  <textarea
                    rows={6}
                    defaultValue={deviceData.observations}
                    name="observations"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DevicesFormUpdate;
