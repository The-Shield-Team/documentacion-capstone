'use client';

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FormEvent } from "react";
import axios from 'axios';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const profile_id = "47032c9c-6bd3-450a-b448-51fbbc0a3839";

    try {
        const authToken = sessionStorage.getItem("authdata"); // Obtén el token del almacenamiento de sesión

        if (!authToken) {
            console.error("No se encontró el token de autorización");
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

        const response = await api.post('/notifications', {
            title,
            description,
            profile_id
        });

        if (response.status === 201) {
            console.log('Notificación enviada exitosamente');
            window.location.href = "/notifications"; // Redirige a la página de notificaciones
        } else {
            window.alert('Hubo un error al crear la notificación');
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        window.alert('Hubo un error en la solicitud');
    }
}

const NotificationsFormCreate = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Crear Notificación" />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Crear Notificación
                            </h3>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Título
                                        </label>
                                        <input
                                            name="title"
                                            type="text"
                                            placeholder="Ingrese el título"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Descripción
                                    </label>
                                    <textarea
                                        rows={6}
                                        name="description"
                                        placeholder="Ingrese la descripción"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    ></textarea>
                                </div>

                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default NotificationsFormCreate;
