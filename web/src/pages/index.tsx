import Button from "@/components/button/button";
import UsersAdd from "@/components/users-add/users-add";
import UsersList from "@/components/users-list/users-list";

export default function Home() {
  return (
    <>
      <div className='mt-4 mx-auto max-w-[1200px]'>
        <div className='flex flex-row justify-end mb-2'>
          <UsersAdd />
        </div>
        <UsersList />
      </div>
    </>
  );
}
