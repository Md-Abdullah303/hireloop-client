import CompaniesTable from "@/components/table/CompaniesTable";
import { getCompanies } from "@/lib/api/companies";

const AdminCompaniesPage = async () => {
  const companies = await getCompanies();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Companies for Review ({companies.length})
        </h1>
        <p className="text-default-500">
          Review and approve company registrations.
        </p>
      </div>

      <CompaniesTable companies={companies} />
    </div>
  );
};

export default AdminCompaniesPage;
