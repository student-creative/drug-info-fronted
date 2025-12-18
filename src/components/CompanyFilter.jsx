import React from 'react';

function CompanyFilter({ companies, selectedCompany, onChange }) {
  return (
    <div className="flex items-center justify-start mb-6 gap-4 flex-wrap">
      <label className="font-semibold text-gray-700 text-lg">Filter by Company:</label>
      <select
        value={selectedCompany}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      >
        <option value="">All Companies</option>
        {companies.map((company, index) => (
          <option key={index} value={company}>
            {company}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CompanyFilter;
