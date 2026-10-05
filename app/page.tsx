import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Storefront } from "@/components/Storefront";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { type, q } = await searchParams;
  const initialType = typeof type === "string" ? type : "";
  const initialQuery = typeof q === "string" ? q : "";

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* key resets the filters when a category link or search changes ?type= / ?q= */}
        <Storefront
          key={`${initialType}|${initialQuery}`}
          initialType={initialType}
          initialQuery={initialQuery}
        />
      </main>
      <Footer />
    </>
  );
}
