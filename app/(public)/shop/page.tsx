"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchPublicParts,
  fetchAvailableFilters,
  fetchPublicModelsByBrand,
  clearModels,
} from "@/lib/redux/productSlice";
import { addToCart } from "@/lib/redux/cartSlice";
import {
  ShoppingCart,
  SlidersHorizontal,
  Loader2,
  Search,
  Plus,
  Minus,
  X,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";

interface Part {
  _id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  description?: string | { fullDescription?: string };
}
interface FilterOption {
  _id: string;
  name: string;
}
interface ModelOption {
  _id: string;
  name: string;
  year: number;
}

const ProductCard: React.FC<{ part: Part; onAddToCart: () => void }> = ({
  part,
  onAddToCart,
}) => {
  const { symbol, rate } = useCurrency();
  const rawDescription =
    typeof part.description === "string"
      ? part.description
      : part.description?.fullDescription || "";
  const descriptionText = rawDescription.replace(/<[^>]*>?/gm, "");

  const convertedPrice = part.price * rate;

  return (
    <div className="group relative bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
      <Link
        href={`/product/${part.slug}`}
        className="block overflow-hidden bg-slate-100 aspect-square relative"
      >
        <Image
          src={part.images[0] || "/images/placeholder.png"}
          alt={part.name}
          fill
          sizes="100vw"
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1">
          <Link
            href={`/product/${part.slug}`}
            className="hover:text-blue-600 line-clamp-2"
          >
            {part.name}
          </Link>
        </h3>
        {descriptionText && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {descriptionText}
          </p>
        )}
        <div className="mt-auto flex justify-between items-center">
          <p className="text-lg font-bold text-slate-900">
            {symbol}
            {convertedPrice.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <button
            onClick={onAddToCart}
            className="flex items-center justify-center h-9 w-9 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterAccordion: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onSearch?: (val: string) => void;
  searchValue?: string;
}> = ({ title, children, defaultOpen = false, onSearch, searchValue }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4"
      >
        <h3 className="font-semibold text-slate-800">{title}</h3>
        {isOpen ? (
          <Minus className="w-5 h-5 text-slate-500" />
        ) : (
          <Plus className="w-5 h-5 text-slate-500" />
        )}
      </button>
      <div
        className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          {onSearch && (
            <div className="mb-3 px-1 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchValue || ""}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={t("shop.filter.searchPlaceholder", { title })}
                className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md"
              />
            </div>
          )}
          <div className="pb-4 space-y-2 max-h-60 overflow-y-auto pr-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function ShopContent() {
  const { t } = useLanguage();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { parts, availableFilters, models, status, totalCount, totalPages } =
    useSelector((state: RootState) => state.products);
  const { user } = useSelector((state: RootState) => state.auth);

  const PAGE_LIMIT = 30;

  const [filters, setFilters] = useState(() => ({
    brand: searchParams.get("brand") || "",
    category: searchParams.get("category") || "",
    model: searchParams.get("model") || "",
    search: searchParams.get("q") || "",
  }));
  const [page, setPage] = useState(() =>
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [globalSearchTerm, setGlobalSearchTerm] = useState(
    () => searchParams.get("q") || ""
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState({
    brand: "",
    category: "",
    model: "",
  });

  const updateURL = useCallback(
    (newFilters: typeof filters, newPage: number) => {
      const params = new URLSearchParams();
      if (newFilters.brand) params.set("brand", newFilters.brand);
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.model) params.set("model", newFilters.model);
      if (newFilters.search) params.set("q", newFilters.search);
      if (newPage > 1) params.set("page", newPage.toString());
      router.replace(`/shop?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const debouncedUpdateURL = useCallback(debounce(updateURL, 500), [updateURL]);

  useEffect(() => {
    dispatch(fetchPublicParts({ ...filters, page, limit: PAGE_LIMIT }));
    debouncedUpdateURL(filters, page);
  }, [filters, page, dispatch, debouncedUpdateURL]);

  useEffect(() => {
    dispatch(fetchAvailableFilters());
  }, [dispatch]);

  useEffect(() => {
    if (filters.brand) dispatch(fetchPublicModelsByBrand(filters.brand));
    else dispatch(clearModels());
  }, [filters.brand, dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name as keyof typeof prev] === value ? "" : value,
      ...(name === "brand" && { model: "" }),
    }));
    setPage(1);
  };

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: globalSearchTerm }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({ brand: "", category: "", model: "", search: "" });
    setGlobalSearchTerm("");
    setPage(1);
    setIsMobileFilterOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const handleAddToCart = async (partId: string) => {
    if (!user) return toast.error(t("shop.cart.loginError"));
    const result = await dispatch(addToCart({ partId, quantity: 1 }));
    if (addToCart.fulfilled.match(result))
      toast.success(t("shop.cart.addSuccess"));
    else toast.error((result.payload as string) || t("shop.cart.addError"));
  };

  const filteredCategories = useMemo(
    () =>
      availableFilters.categories.filter((cat) =>
        cat.name.toLowerCase().includes(sidebarSearch.category.toLowerCase())
      ),
    [availableFilters.categories, sidebarSearch.category]
  );
  const filteredBrands = useMemo(
    () =>
      availableFilters.brands.filter((brand) =>
        brand.name.toLowerCase().includes(sidebarSearch.brand.toLowerCase())
      ),
    [availableFilters.brands, sidebarSearch.brand]
  );
  const filteredModels = useMemo(
    () =>
      models.filter((model) =>
        model.name.toLowerCase().includes(sidebarSearch.model.toLowerCase())
      ),
    [models, sidebarSearch.model]
  );
  
  const uniqueParts = useMemo(
    () => [...new Map(parts.map((item) => [item._id, item])).values()],
    [parts]
  );
  const displayedParts = useMemo(() => Array.from(uniqueParts), [uniqueParts]);
  
  const getPaginationItems = useMemo(() => {
    if (totalPages <= 1) return [];
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (page >= totalPages - 3)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  }, [page, totalPages]);

  const FilterContent = (
    <div className="space-y-1">
      <FilterAccordion
        title={t("shop.filter.categories")}
        defaultOpen={true}
        searchValue={sidebarSearch.category}
        onSearch={(val) =>
          setSidebarSearch((prev) => ({ ...prev, category: val }))
        }
      >
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat: FilterOption) => (
            <div key={cat._id} className="flex items-center">
              <input
                id={`cat-${cat._id}`}
                name="category"
                value={cat._id}
                onChange={handleFilterChange}
                checked={filters.category === cat._id}
                type="radio"
                className="h-4 w-4"
              />
              <label htmlFor={`cat-${cat._id}`} className="ml-3 text-sm w-full">
                {cat.name}
              </label>
            </div>
          ))
        ) : (
          <p className="text-xs italic">{t("shop.filter.noCategories")}</p>
        )}
      </FilterAccordion>
      <FilterAccordion
        title={t("shop.filter.brands")}
        defaultOpen={true}
        searchValue={sidebarSearch.brand}
        onSearch={(val) =>
          setSidebarSearch((prev) => ({ ...prev, brand: val }))
        }
      >
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand: FilterOption) => (
            <div key={brand._id} className="flex items-center">
              <input
                id={`brand-${brand._id}`}
                name="brand"
                value={brand._id}
                onChange={handleFilterChange}
                checked={filters.brand === brand._id}
                type="radio"
                className="h-4 w-4"
              />
              <label
                htmlFor={`brand-${brand._id}`}
                className="ml-3 text-sm w-full"
              >
                {brand.name}
              </label>
            </div>
          ))
        ) : (
          <p className="text-xs italic">{t("shop.filter.noBrands")}</p>
        )}
      </FilterAccordion>
      {filters.brand && (
        <FilterAccordion
          title={t("shop.filter.models")}
          defaultOpen={true}
          searchValue={sidebarSearch.model}
          onSearch={(val) =>
            setSidebarSearch((prev) => ({ ...prev, model: val }))
          }
        >
          {status === "loading" && models.length === 0 ? (
            <Loader2 className="animate-spin" />
          ) : filteredModels.length > 0 ? (
            filteredModels.map((model: ModelOption) => (
              <div key={model._id} className="flex items-center">
                <input
                  id={`model-${model._id}`}
                  name="model"
                  value={model._id}
                  onChange={handleFilterChange}
                  checked={filters.model === model._id}
                  type="radio"
                  className="h-4 w-4"
                />
                <label
                  htmlFor={`model-${model._id}`}
                  className="ml-3 text-sm w-full"
                >
                  {model.name} {model.year ? `(${model.year})` : ""}
                </label>
              </div>
            ))
          ) : (
            <p className="text-xs italic">{t("shop.filter.noModels")}</p>
          )}
        </FilterAccordion>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen flex flex-col mt-16">
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-white">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">{t("shop.filter.title")}</h2>
            <button onClick={() => setIsMobileFilterOpen(false)}>
              <X />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">{FilterContent}</div>
          <div className="p-4 border-t flex gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 border rounded-lg"
            >
              {t("shop.filter.reset")}
            </button>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="flex-1 py-3 bg-blue-700 text-white rounded-lg"
            >
              {t("shop.filter.showResults")}
            </button>
          </div>
        </div>
      )}
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-4xl font-extrabold">{t("shop.title")}</h1>
          <p className="text-lg text-slate-600 mt-2">{t("shop.subtitle")}</p>
          <form
            onSubmit={handleGlobalSearchSubmit}
            className="relative max-w-xl mx-auto mt-8"
          >
            <input
              type="text"
              value={globalSearchTerm}
              onChange={(e) => setGlobalSearchTerm(e.target.value)}
              placeholder={t("shop.search.placeholder")}
              className="w-full bg-white rounded-full py-3.5 pl-12 pr-4 border"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border p-5">
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <SlidersHorizontal /> {t("shop.filter.title")}
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-sm font-semibold text-blue-600"
                >
                  {t("shop.filter.resetAll")}
                </button>
              </div>
              {FilterContent}
            </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="lg:hidden mb-6 flex flex-col gap-4">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center justify-center gap-2 py-3 bg-white border rounded-lg"
              >
                <Filter /> {t("shop.filter.title")}
              </button>
            </div>
            {status === "loading" && displayedParts.length === 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-slate-200 h-[340px] rounded-xl animate-pulse"
                  ></div>
                ))}
              </div>
            ) : displayedParts.length > 0 ? (
              <>
                <div className="text-sm text-slate-500 mb-4">
                  {t("shop.results.showing")} {(page - 1) * PAGE_LIMIT + 1}-
                  {Math.min(page * PAGE_LIMIT, totalCount)}{" "}
                  {t("shop.results.of")} {totalCount}{" "}
                  {t("shop.results.results")}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedParts.map((part: Part) => (
                    <ProductCard
                      key={part._id}
                      part={part}
                      onAddToCart={() => handleAddToCart(part._id)}
                    />
                  ))}
                </div>
                {totalPages > 1 && (
                  <nav
                    className="flex items-center justify-center mt-12"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {getPaginationItems.map((item, index) =>
                      typeof item === "number" ? (
                        <button
                          key={`${item}-${index}`}
                          onClick={() => handlePageChange(item)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === item ? "bg-blue-600 text-white" : "text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50"}`}
                        >
                          {item}
                        </button>
                      ) : (
                        <span
                          key={`dots-${index}`}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-300"
                        >
                          ...
                        </span>
                      )
                    )}
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-500 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <h3 className="text-xl font-bold">
                  {t("shop.noProducts.title")}
                </h3>
                <p className="text-slate-500 mt-2">
                  {t("shop.noProducts.sub")}
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2 bg-blue-700 text-white rounded-lg"
                >
                  {t("shop.noProducts.clearBtn")}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const { t } = useLanguage();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />{" "}
          <span className="ml-4">{t("shop.loading")}</span>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}