import Button from "@/components/button/button";
import UsersList from "@/components/users-list/users-list";

export default function Home() {
  return (
    <>
      <div className='mt-4 mx-auto max-w-[800px]'>
        <div className='flex flex-row justify-end mb-2'>
          <Button>Adicionar</Button>
        </div>
        <UsersList />
      </div>
    </>
  );
}
