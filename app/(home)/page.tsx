import PageContainer from '@/components/layout/page-container';

export default async function Home() {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Homepage 👋</h2>
        </div>
      </div>
    </PageContainer>
  );
}
