import React from 'react';
import { Certificate } from '@prisma/client';
import { Medal, Calendar, User, ArrowUpRight } from 'lucide-react';

interface ParticipationCertificateListProps {
  certificates: Certificate[];
}

const ParticipationCertificateList: React.FC<ParticipationCertificateListProps> = ({ certificates }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="px-4 py-3 border-b border-gray-700">
        <div className="flex items-center">
          <Medal className="h-5 w-5 text-blue-400 mr-2" />
          <h2 className="text-lg font-semibold text-white">Participation Certificates</h2>
        </div>
      </div>
      
      <ul className="divide-y divide-gray-700">
        {certificates.length === 0 ? (
          <li className="px-4 py-6 text-center text-gray-400">
            No participation certificates found.
          </li>
        ) : (
          certificates.map((certificate, index) => {
            if (!certificate.issuedDate) return null; 
            const formattedDate = new Date(certificate.issuedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });
            
            return (
              <li key={index} className="group hover:bg-gray-750 transition-colors duration-150">
                <a 
                  href={certificate.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-3"
                >
                  <div className="sm:flex sm:justify-between sm:items-center">
                    <div>
                      <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors duration-150 flex items-center">
                        {certificate.issuedFor}
                        <ArrowUpRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                      </h3>
                      
                      <div className="mt-1 flex items-center text-sm text-gray-400">
                        <User className="h-4 w-4 mr-1" />
                        <span>{certificate.issuedTo}</span>
                        {certificate.roll_number && (
                          <>
                            <span className="mx-2 text-gray-500">•</span>
                            <span>Roll: {certificate.roll_number}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2 sm:mt-0 flex items-center">
                      <div className="mr-3">
                        {certificate.branch && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                            {certificate.branch}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formattedDate}
                      </div>
                    </div>
                  </div>
                  
                  {certificate.SerialNumber && (
                    <div className="mt-2 text-xs text-gray-500">
                      Serial: {certificate.SerialNumber}
                    </div>
                  )}
                </a>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default ParticipationCertificateList;