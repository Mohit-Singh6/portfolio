import MohitSinghInit from '@/components/customs/mohitSinghHeading';
import SidebarNav from '@/components/customs/sideNavbar';

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black/0">
      <main className="flex flex-1 w-full flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black/0">
        <SidebarNav/>
        <MohitSinghInit/>
      </main>
    </div>
  );
}
