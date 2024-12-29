import { useState } from "react";

interface DeleteTeacherItemsByAdmin {
  name: string;
  department: string;
  email: string;
  onDelete: () => void;
  isactive: boolean;
}

const DeleteTeacherItemsByAdmin: React.FC<DeleteTeacherItemsByAdmin> = ({ name, department, email, onDelete, isactive }) => {
  console.log("isactive ", isactive)
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
  };

  return (
    <tr className={`bg-red-200 border-b ${isactive ? "bg-white" : "bg-red-200 !important"}`}>
      <th scope="row " className="items-center gap-3 sm:flex px-6 py-4 font-medium text-gray-800  whites ">
        {name ? name : "No Name"}
      </th>
      <td className="px-6 py-4">
        {department ? department : "No Department"}
      </td>
      <td className="px-6 py-4">
        {email ? email : "No Email"}
      </td>
      <td className="px-0 py-1 flex items-center justify-center">
        {loading ? (
          <span>Loading...</span>
        ) : (
          <button className="bg-red-500 py-2 px-5 rounded-md font-bold text-sm hover:text-white hover:bg-red-600"
            onClick={handleDelete}>
            Delete
          </button>
        )}
      </td>
    </tr>
  )
}

export default DeleteTeacherItemsByAdmin