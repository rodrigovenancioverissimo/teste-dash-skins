import { useUserContext } from "@/context/users.context";
import UsersEdit from "../users-edit/users-edit";
import UserDelete from "../user-delete/user-delete";
import { useState } from "react";

const columns = ["Nome", "Email", "Idade", "Avatar", "Ações"];

export default function UsersList() {
  const { users, deletedUser, blinkUser } = useUserContext();

  return (
    <>
      <div>
        <div className='shadow-md overflow-auto rounded-md'>
          <table className='w-full text-md text-gray-500'>
            <thead className='text-white uppercase bg-gray-800'>
              <tr className='whitespace-nowrap text-left'>
                {columns.map((column, index) => (
                  <th scope='col' className='p-4' key={index}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='transition duration-700'>
              {users.map((item, i) => (
                <tr
                  key={i}
                  className={`bg-white border-b hover:bg-gray-50 whitespace-nowrap h-14 ${
                    deletedUser === item._id
                      ? "transition duration-700 opacity-0"
                      : ""
                  }${blinkUser === item._id ? "blink" : ""}`}
                >
                  <td className='pl-4'>{item.name}</td>
                  <td className='pl-4'>{item.email}</td>
                  <td className='pl-4'>{item.age}</td>
                  <td className='pl-4'>{item.avatar}</td>
                  <td className='pl-4'>
                    <div className='flex flex-row gap-2'>
                      <UsersEdit user={item} />
                      <UserDelete id={item._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
