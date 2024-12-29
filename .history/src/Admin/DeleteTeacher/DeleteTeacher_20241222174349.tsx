import { useState } from "react";

interface DeleteTeacherItemsByAdmin {
  name: string;
  department: string;
  email: string;
  onDelete: () => void;
  isactive: boolean;
}



const DeleteTeacherItemsByAdmin: React.FC<DeleteTeacherItemsByAdmin> = ({ name, department, email, onDelete, isactive }) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true); // Set loading to true
    await onDelete(); // Call the onDelete function
    setLoading(false); // Set loading to false after deletion
  };

  return (
    <tr className={`bg-white border-b ${!isactive ? "bg" : ""}`}>
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
        {loading ? ( // Conditionally render loading state
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