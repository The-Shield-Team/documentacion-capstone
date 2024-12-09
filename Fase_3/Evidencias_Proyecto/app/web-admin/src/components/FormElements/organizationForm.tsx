"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import axios from "axios";
import { useEffect, useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const authToken = sessionStorage.getItem("authdata"); // Obtener el token dinámicamente

if (!authToken) {
  console.error("No se encontró el token de autorización.");
  alert("No se pudo autenticar la solicitud. Por favor, inicia sesión nuevamente.");
  window.location.href = "/login";
}

const OrganizationForm = () => {
  const [organization, setOrganization] = useState(Object);
  const [building, setBuilding] = useState(Object);

  useEffect(() => {
    const fetchOrgnization = async () => {
      try {
        const authToken = sessionStorage.getItem('authdata');
        if (!authToken) {
          console.error('No se encontró el token de autorización');
          return;
        }

        const api = axios.create({
          baseURL: supabaseUrl,
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        const response = await api.get('/organizations', { params: { id: `eq.${2}` } });
        setOrganization(response.data);
      } catch (error) {
        console.error('Error al obtener los dispositivos:', error);
      }
    };

    const fetchBuilding = async () => {
      try {
        const authToken = sessionStorage.getItem('authdata');
        if (!authToken) {
          console.error('No se encontró el token de autorización');
          return;
        }

        const api = axios.create({
          baseURL: supabaseUrl,
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        const response = await api.get('/buildings', { params: { id: `eq.${2}` } });
        setBuilding(response.data);
      } catch (error) {
        console.error('Error al obtener los dispositivos:', error);
      }
    };


    fetchOrgnization();
    fetchBuilding();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Organización" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">

          {/* <!-- Datos de la orgnización --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Datos de la orgnización
              </h3>
            </div>

            <div className="flex flex-col gap-5.5 p-6.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nombre de la orgnización
              </label>
              <input
                type="text"
                defaultValue={organization[0]?.name}
                disabled
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Nombre de la sede
              </label>
              <input
                type="text"
                disabled
                defaultValue={building[0]?.name}
                placeholder="Ingresa el nombre de la sede"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationForm;
