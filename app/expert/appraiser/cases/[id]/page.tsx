// app/expert/cases/[id]/page.tsx
import ClientCasePage from './ClientCasePage';

// Only prebuild the IDs you list here:
export const dynamicParams = false;
const CASE_IDS = ['CLM-2024-043', 'CLM-2024-044', 'CLM-2024-045', 'CLM-2024-046']; // TODO: replace with your real IDs


export async function generateStaticParams() {
  return CASE_IDS.map((id) => ({ id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // <-- await here
  return <ClientCasePage id={id} />;
}