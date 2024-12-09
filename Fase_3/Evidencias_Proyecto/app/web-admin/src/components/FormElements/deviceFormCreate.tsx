'use client';

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import { FormEvent } from "react";
import axios from 'axios';
import { DeviceInOrOutEnum, DeviceStatusEnum, DeviceTypeEnum } from "@/types/device.type";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = formData.get('name') as string;
  const type = formData.get('type') as string;
  const tag_id = parseInt(formData.get('tag_id') as string);
  const status = DeviceStatusEnum.available;
  const room_id = null;
  const in_or_out = DeviceInOrOutEnum.out; // Valor por defecto
  const observations = formData.get('observations') as string;

  try {
    const authToken = sessionStorage.getItem("authdata"); // Obtener el token del almacenamiento de sesión

    if (!authToken) {
      console.error("No se encontró el token de autorización.");
      window.alert("No se pudo autenticar la solicitud. Por favor, inicia sesión nuevamente.");
      window.location.href = "/login";
      return;
    }

    const api = axios.create({
      baseURL: supabaseUrl,
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await api.post('/devices', {
      name,
      type,
      tag_id,
      status,
      room_id,
      in_or_out,
      observations,
    });

    if (response.status === 201) {
      console.log('Dispositivo creado exitosamente');
      window.location.href = "/devices"; // Redirige a la página de dispositivos
    } else {
      console.error('Error al crear el dispositivo:', response.data);
      window.alert('Hubo un error al crear el dispositivo');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    window.alert('Hubo un error en la solicitud');
  }
}

const DevicesFormCreate = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Devices Form" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Crear equipo
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nombre
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Ingrese el nombre del dispositivo"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne selectName="Tipo" options={Object.values(DeviceTypeEnum)} nameVal="type" />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Tag ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name="tag_id"
                    type="text"
                    placeholder="Ingrese el ID del tag"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Notas
                  </label>
                  <textarea
                    name="observations"
                    rows={6}
                    placeholder="Ingrese observaciones"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

export default DevicesFormCreate;
