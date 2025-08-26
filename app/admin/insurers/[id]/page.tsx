// app/expert/cases/[id]/page.tsx
import AdminInsurersPage from './AdminInsurersPage';

// Only prebuild the IDs you list here:
export const dynamicParams = false;
const INSURER_IDS = ['INS-2024-001', 'INS-2024-002', 'INS-2024-003', 'INS-2024-004'];


export async function generateStaticParams() {
  return INSURER_IDS.map((id) => ({ id }));
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // <-- await here
  return <AdminInsurersPage id={id} />;
}