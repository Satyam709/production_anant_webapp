interface Member {
  [key: string]: string | number;  // This allows for string or number values in member properties
}

export default function MembersTable({ members }: { members: Member[] }) {
  return (
    <div className="overflow-x-auto p-2 sm:p-6 -mx-2 sm:mx-0">
      <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 border border-gray-600 shadow-xl">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-600">
              {members[0] &&
                Object.keys(members[0]).map((key, idx) => (
                  <th
                    key={idx}
                    className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold tracking-wider text-gray-200 uppercase"
                  >
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {members.map((member, idx) => (
              <tr 
                key={idx} 
                className="transition-colors hover:bg-gray-800/50"
              >
                {Object.values(member).map((val, idy) => (
                  <td 
                    key={idy} 
                    className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-300 break-words"
                  >
                    {String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
