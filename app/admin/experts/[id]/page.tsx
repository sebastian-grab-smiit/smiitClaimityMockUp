// app/expert/cases/[id]/page.tsx
import AdminExpertsPage from './AdminExpertsPage';

// Only prebuild the IDs you list here:
export const dynamicParams = false;
const EXPERT_IDS = ['EXP-2024-001', 'EXP-2024-002', 'EXP-2024-003'];


export async function generateStaticParams() {
  return EXPERT_IDS.map((id) => ({ id }));
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // <-- await here
  return <AdminExpertsPage id={id} />;
}