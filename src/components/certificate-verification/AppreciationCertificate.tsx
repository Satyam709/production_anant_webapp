import { Certificate } from '@prisma/client';
import { Award, BookOpen, Calendar, Hash, Trophy, User } from 'lucide-react';
import React from 'react';

interface AppreciationCertificateProps {
  certificate: Certificate;
}

const AppreciationCertificate: React.FC<AppreciationCertificateProps> = ({
  certificate,
}) => {
  let formattedDate = null;

  if (certificate.issuedDate) {
    formattedDate = new Date(certificate.issuedDate).toLocaleDateString(
      'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  }

  return (
    <a
      href={certificate.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block transform transition-all duration-300 hover:scale-[1.02] focus:outline-none"
    >
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors duration-300">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2"></div>
        <div className="px-6 py-5">
          <div className="flex items-center mb-4">
            <Award className="h-7 w-7 text-blue-400 mr-3" />
            <h3 className="text-xl font-bold text-white">
              {certificate.issuedFor}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-400">Issued To</p>
                  <p className="font-semibold text-white">
                    {certificate.issuedTo}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-400">Issue Date</p>
                  {formattedDate && (
                    <p className="font-medium text-gray-300">{formattedDate}</p>
                  )}
                </div>
              </div>

              {certificate.branch && (
                <div className="flex items-center mb-3">
                  <BookOpen className="h-5 w-5 text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Branch</p>
                    <p className="font-medium text-gray-300">
                      {certificate.branch}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              {certificate.roll_number && (
                <div className="flex items-center mb-3">
                  <Hash className="h-5 w-5 text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Roll Number</p>
                    <p className="font-medium text-gray-300">
                      {certificate.roll_number}
                    </p>
                  </div>
                </div>
              )}

              {certificate.SerialNumber && (
                <div className="flex items-center mb-3">
                  <span className="flex-shrink-0 h-5 w-5 text-blue-400 flex items-center justify-center mr-2">
                    <span className="font-bold text-xs">S/N</span>
                  </span>
                  <div>
                    <p className="text-sm text-gray-400">Serial Number</p>
                    <p className="font-medium text-gray-300">
                      {certificate.SerialNumber}
                    </p>
                  </div>
                </div>
              )}

              {certificate.ranking && (
                <div className="flex items-center mb-3">
                  <Trophy className="h-5 w-5 text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Ranking</p>
                    <p className="font-medium text-gray-300">
                      {certificate.ranking === 1
                        ? '1st'
                        : certificate.ranking === 2
                          ? '2nd'
                          : certificate.ranking === 3
                            ? '3rd'
                            : `${certificate.ranking}th`}{' '}
                      Place
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-300">
              <Award className="h-4 w-4 mr-1" />
              Appreciation Certificate
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default AppreciationCertificate;
