import MainLayout from "@/components/layout/MainLayout";
import AmebloFeed from "@/components/blog/AmebloFeed";

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="content-sections blog-page">
        <section className="content-section">
          <div className="section-inner">
            <div className="ameblo-section">
              <AmebloFeed />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
