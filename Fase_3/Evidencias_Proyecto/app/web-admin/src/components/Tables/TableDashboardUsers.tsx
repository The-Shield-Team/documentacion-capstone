import Link from "next/link";
import Image from "next/image";
import { Profile } from "@/types/profile.type";

const TableDashboardUsers = (props: { profiles: Profile[]; }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Usuarios Recientes
      </h4>

      <div>
        {props.profiles.slice(0, 7).map((profile: Profile, key: number) => (
          <Link
            href="/"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >


            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {profile.full_name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {profile.medical_role}
                  </span>
                  <br />
                  <span className="text-sm text-black dark:text-white">
                    {new Date(profile.updated_at).toISOString().split('T')[0]}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TableDashboardUsers;
