import React, { useState, useEffect } from 'react';
import CompanyFilter from './CompanyFilter';

function DrugTable() {
  const [drugs, setDrugs] = useState([]);
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  useEffect(() => {
    // Fetch table data
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(data => {
        const sortedData = data.sort(
          (a, b) => new Date(b.launchDate) - new Date(a.launchDate)
        );
        setDrugs(sortedData);
        setFilteredDrugs(sortedData);
      })
      .catch(err => console.error(err));

    // Fetch unique companies for dropdown
    fetch('http://localhost:3000/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error(err));
  }, []);

  const handleFilterChange = (company) => {
    setSelectedCompany(company);
    if (!company) {
      setFilteredDrugs(drugs);
    } else {
      setFilteredDrugs(drugs.filter(d => d.company === company));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Drug Information</h1>

      <CompanyFilter
        companies={companies}
        selectedCompany={selectedCompany}
        onChange={handleFilterChange}
      />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              <th className="px-4 py-3 border border-blue-500">Id</th>
              <th className="px-4 py-3 border border-blue-500">Code</th>
              <th className="px-4 py-3 border border-blue-500">Name</th>
              <th className="px-4 py-3 border border-blue-500">Company</th>
              <th className="px-4 py-3 border border-blue-500">Launch Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrugs.map((drug, index) => (
              <tr
                key={index}
                className={`hover:bg-blue-50 ${selectedCompany === drug.company ? 'bg-blue-100 font-semibold' : ''
                  }`}
              >
                <td className="px-4 py-3 border border-gray-300">{index + 1}</td>
                <td className="px-4 py-3 border border-gray-300">{drug.code}</td>
                <td className="px-4 py-3 border border-gray-300">{drug.genericName} ({drug.brandName})</td>
                <td className="px-4 py-3 border border-gray-300">
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => handleFilterChange(drug.company)}
                  >
                    {drug.company}
                  </span>
                </td>
                <td className="px-4 py-3 border border-gray-300">{new Date(drug.launchDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredDrugs.length === 0 && (
          <div className="p-4 text-center text-gray-500">No drugs found.</div>
        )}
      </div>
    </div>
  );
}

export default DrugTable;
