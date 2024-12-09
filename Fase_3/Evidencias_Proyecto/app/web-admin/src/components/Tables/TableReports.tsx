'use client';

import CheckboxOne from '../Checkboxes/CheckboxOne';
import { useEffect, useState } from 'react';
// @ts-ignore
import { NotificationDTO } from '@/types/reportstype';
import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const reports = async () => {
  try {
    const authToken = sessionStorage.getItem("authdata"); // Obtener el token dinámicamente

    if (!authToken) {
      console.error("No se encontró el token de autorización.");
      alert("No se pudo autenticar la solicitud. Por favor, inicia sesión nuevamente.");
      window.location.href = "/login";
      return [];
    }

    const api = axios.create({
      baseURL: supabaseUrl,
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    const response = await api.get('/reports', {
      params: {
        select: '*, profiles(id, full_name), devices(id, name)',
        order: 'created_at.asc',
      },
    }
    );
    return response.data as NotificationDTO[];
  } catch (e) {
    console.error('Error al obtener los reportes:', e);
    return [];
  }
};

const TablereportsClient = () => {
  const [reportList, setReportList] = useState<NotificationDTO[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await reports();
      setReportList(data.reverse());
    };

    fetchReports();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Título
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Fecha de Creación
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Descripción
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Equipo Médico
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Creador
              </th>
            </tr>
          </thead>
          <tbody>
            {reportList.map((notification: NotificationDTO, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {notification.title}
                  </h5>
                  <p className="text-sm">#{notification.id}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(notification.created_at).toISOString().split('T')[0]}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {notification.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {notification.devices.name}
                  </p>
                  <p className="text-black dark:text-white">
                    #{notification.devices.id}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {notification.profiles.full_name}
                  </p>
                  #{notification.profiles.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablereportsClient;
