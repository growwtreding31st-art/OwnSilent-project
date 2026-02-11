import Layout from "../../components/Layout";
import { getCategories } from "../../lib/api";

export default async function CategoriesPage() {
  const categories = await getCategories(); // Replace with real API

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-8">Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {cat.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              Explore all products in {cat.name}.
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
