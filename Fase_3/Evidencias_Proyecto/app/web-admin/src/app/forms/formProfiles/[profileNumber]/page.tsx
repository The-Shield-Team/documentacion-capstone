import { Metadata } from "next";
import FormProfilesClient from "@/components/FormElements/profileFormUpdate";

export const metadata: Metadata = {
  title: "HIR - Profiles",
  description:
    "HIR - Profiles",
};
// @ts-ignore
const FormProfilesUpdate = async ({ params }) => {
  const { profileNumber } = params;

  return (
    <FormProfilesClient profileId={profileNumber} />
  );
};

export default FormProfilesUpdate;
