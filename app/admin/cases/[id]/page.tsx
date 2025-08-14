// app/expert/cases/[id]/page.tsx
import AdminCasesPage from './AdminCasesPage';

// Only prebuild the IDs you list here:
export const dynamicParams = false;
const CASE_IDS = ['CLM-2024-001', 'CLM-2024-002', 'CLM-2024-003'];


export async function generateStaticParams() {
  return CASE_IDS.map((id) => ({ id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // <-- await here
  return <AdminCasesPage id={id} />;
}