// src/pages/ViewResult.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SSidebar';
import SHeader from '../components/SHeader';

export default function ViewResult() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(o => !o);
  const [expandedSemester, setExpandedSemester] = useState('fall2024');
  const navigate = useNavigate();

  const semesters = [
    {
      id: 'fall2024',
      label: '2024 – Fall Semester',
      subjects: [
        'Mobile App Development',
        'Parallel & Distributed Computing',
        'Islamic Studies',
        'Machine Learning',
        'Computer Intelligence',
      ],
    },
    {
      id: 'spring2024',
      label: '2024 – Spring Semester',
      subjects: ['Data Structures', 'Computer Networks'],
    },
    {
      id: 'fall2023',
      label: '2023 – Fall Semester',
      subjects: ['Operating Systems', 'Digital Logic Design'],
    },
  ];

  const toggleSemester = (id) =>
    setExpandedSemester(expandedSemester === id ? null : id);

  const handleSubjectClick = (subject) =>
    navigate('/view-result-detail', { state: { subject } });

  return (
    <div className="min-h-screen flex bg-[#f9f9f9] overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col [@media(min-width:845px)]:ml-64">
        <SHeader toggleSidebar={toggleSidebar} />

        <div className="px-2 md:px-4 lg:px-16 py-4 md:py-8">
          <h1 className="text-[22px] md:text-4xl font-bold text-[#002855] mb-2">
            View Results
          </h1>
          <p className="text-[16px] md:text-lg text-gray-600 mb-8">
            Click on a subject to view exam results
          </p>

          {semesters.map((sem) => (
            <section key={sem.id} className="mb-6">
              <button
                onClick={() => toggleSemester(sem.id)}
                className="w-full bg-[#002855] text-white px-4 md:px-6 py-2 md:py-3 rounded flex justify-between items-center text-[16px] md:text-lg"
              >
                {sem.label}
                <span>{expandedSemester === sem.id ? '▲' : '▼'}</span>
              </button>

              {expandedSemester === sem.id && (
                <div className="bg-white rounded-b-xl shadow-md divide-y divide-gray-200 overflow-hidden">
                  {sem.subjects.map((subj) => (
                    <div
                      key={subj}
                      onClick={() => handleSubjectClick(subj)}
                      className="px-4 md:px-6 py-3 cursor-pointer hover:bg-gray-100 transition"
                    >
                      {subj}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
