'use client';

import { useState } from 'react';
import Navbar from '../comps/header';

export default function Page() {
  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);


  const data = []; // incorporate your nigga data

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  return (
    <div className="bg-gray-100 w-full text-black min-h-screen">
      <Navbar />
      <div className="p-5">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-1/4"
        />
      </div>
      <div className="p-2 px-6">
        <label>
          Items per page:
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="p-2 border rounded ml-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-6 ">
        <table className="w-full border-collapse border-2">
          <thead>
            <tr className="bg-gray-200 rounded-3xl">
              <th className="p-2 border text-center">Name</th>
              <th className="p-2 border text-center">Email</th>
              <th className="p-2 border text-center">Role</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.id}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.downloads}</td>
             
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td className="p-2 border text-center">No data found!</td>
                <td className="p-2 border text-center">No data found!</td>
                <td className="p-2 border text-center">No data found!</td>
                <td className='text-center'>
                <button>Edit</button>
                <button>Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls Ni */}
      <div className="flex  px-6 justify-between items-center">
        <div>
          <span>
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of{' '}
            {filteredData.length} entries
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>     
    </div>
  );
}