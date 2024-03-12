const columns = ["Nome", "Email", "Idade", "Avatar"];

export default function UsersList() {
  return (
    <>
      <div>
        <div className='shadow-md'>
          <table className='w-full text-md text-gray-500'>
            <thead className='text-gray-700 uppercase bg-gray-50'>
              <tr className='whitespace-nowrap text-left'>
                {columns.map((column, index) => (
                  <th scope='col' className='p-4' key={index}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='items-start'>
              {[
                { name: "User", email: "user@email.com", age: 18, avatar: "" },
              ].map((item, i) => (
                <tr
                  className='bg-white border-b hover:bg-gray-50 whitespace-nowrap h-14'
                  key={i}
                >
                  <td className='pl-4'>{item.name}</td>
                  <td className='pl-4'>{item.email}</td>
                  <td className='pl-4'>{item.age}</td>
                  <td className='pl-4'>{item.avatar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
