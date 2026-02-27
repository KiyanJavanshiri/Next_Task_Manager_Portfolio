import { getUser } from "@/utils/actions/user/getUser";
import ProfileEditForm from "@/compositions/ProfileEditForm";

const ProfilePage = async () => {
  const user = await getUser();

  return (
    <section>
      <h1 className="text-2xl font-semibold text-black dark:text-white leading-[143%] pb-6 border-b border-gray-300 dark:border-gray-600">
        My Profile
      </h1>
      <div className="flex justify-between items-start gap-x-25 mt-6">
        <div>
          <h2 className="text-lg font-semibold text-black leading-[143%] dark:text-white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm font-normal text-gray-500 leading-[143%] dark:text-gray-400">
            Edit your name and profile picture
          </p>
        </div>
        <ProfileEditForm user={user!} />
      </div>
    </section>
  );
};

export default ProfilePage;
