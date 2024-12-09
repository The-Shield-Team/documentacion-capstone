'use client';

import { FormEvent, useState, useEffect } from "react";
import axios from 'axios';
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import DefaultLayout from "../Layouts/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { ProfileMedicalRoleEnum } from "@/types/profile.type";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const FormProfilesClient = ({ profileId }: { profileId: string }) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el perfil
  const getProfile = async (profileId: string) => {
    try {
      const authToken = sessionStorage.getItem("authdata"); // Obtener el token del almacenamiento
      if (!authToken) {
        console.error("No se encontró el token de autorización.");
        alert("No se pudo autenticar la solicitud. Por favor, inicia sesión nuevamente.");
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

      const response = await api.get(`/profiles`, {
        params: {
          id: `eq.${profileId}`
        }
      });

      if (response.data.length > 0) {
        setProfileData(response.data[0]);
      } else {
        console.error("No se encontró el perfil con el ID proporcionado.");
        alert("No se encontró el perfil. Por favor, verifica el ID.");
      }
    } catch (e) {
      console.error('Error al obtener el perfil:', e);
      alert("Hubo un error al obtener los datos del perfil.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos del perfil cuando el componente se monta
  useEffect(() => {
    if (profileId) {
      getProfile(profileId);
    }
  }, [profileId]);

  // Función para actualizar el perfil
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const full_name = formData.get("fullName") as string;
    const medical_role = formData.get("medicalRole") as string;
    const sex = formData.get("sex") as string === "Hombre" ? "male" : "female";
    const is_active = formData.get("status") === "Activo";
    const observations = formData.get("observations") as string;
    const id = profileData.id;
    const updated_at = new Date();

    try {
      const authToken = sessionStorage.getItem("authdata"); // Obtener el token del almacenamiento local
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

      const response = await api.patch(
        `/profiles`,
        {
          updated_at,
          full_name,
          medical_role,
          sex,
          is_active,
          observations,
        },
        {
          params: {
            id: `eq.${id}`
          },
        }
      );

      if (response.status === 204) {
        console.log('Perfil actualizado correctamente');
        window.location.href = "/users";
      } else {
        console.error('Error al actualizar el perfil:', response.data);
        window.alert('Hubo un error al actualizar el usuario.');
      }
    } catch (e) {
      console.error('Error en la solicitud:', e);
      window.alert('Hubo un error en la solicitud.');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!profileData) {
    return <p>No se encontraron datos del perfil.</p>;
  }

  const allMedicalRoles: ProfileMedicalRoleEnum[] = Object.values(ProfileMedicalRoleEnum).filter(
    (type) => type !== profileData.medical_role
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Editar Usuario" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Editar usuario #{profileData.id}
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="p-6.5">
                <input type="hidden" name="id" value={profileData.id} />
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      defaultValue={profileData.full_name}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      selectName="Tipo"
                      options={[profileData.medical_role, ...allMedicalRoles]}
                      nameVal="medicalRole"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      selectName="Sexo"
                      options={profileData.sex === "male" ? ["Hombre", "Mujer"] : ["Mujer", "Hombre"]}
                      nameVal="sex"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      selectName="Estado"
                      options={profileData.is_active ? ["Activo", "Inactivo"] : ["Inactivo", "Activo"]}
                      nameVal="status"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Observaciones
                  </label>
                  <textarea
                    name="observations"
                    rows={6}
                    defaultValue={profileData.observations}
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

export default FormProfilesClient;
