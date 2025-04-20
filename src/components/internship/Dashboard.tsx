"use client";

import InternshipForm from "./InternshipForm";
import InternshipDashboard from "./InternshipDashboard";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const session = useSession();
  const user = session.data?.user;
  const isAdmin = user?.info?.position != "Member";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Internship Form */}
      <section>
        <div className="sticky top-8">
          <h2 className="text-2xl font-bold text-blue-100 mb-6">
            Add Internship
          </h2>
          <InternshipForm />
        </div>
      </section>

      {/* Internship List */}

      {isAdmin && (
        <section>
          <h2 className="text-2xl font-bold text-blue-100 mb-6">
            Manage Internships
          </h2>
          <InternshipDashboard />
        </section>
      )}
    </div>
  );
};

export default Dashboard;
