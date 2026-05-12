import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productService";

const ITEMS_PER_PAGE = 8;

const SORT_OPTIONS = [
  { value: "default", label: "Relevancia" },
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
  { value: "rating_desc", label: "Mejor calificados" },
  { value: "az", label: "A–Z" },
];

const CATEGORIES = [
  { value: "", label: "Todas" },
  { value: "men's clothing", label: "Ropa Hombre" },
  { value: "women's clothing", label: "Ropa Mujer" },
  { value: "jewelery", label: "Joyería" },
  { value: "electronics", label: "Electrónica" },
];

export { SORT_OPTIONS, CATEGORIES };

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    let result = products.filter((product) => {
      const matchesSearch =
        !normalized ||
        product.title.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized);

      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sortBy) {
      case "price_asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        result = [...result].sort((a, b) => (b.rate || 0) - (a.rate || 0));
        break;
      case "az":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("default");
    setMaxPrice(1000);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "" ||
    sortBy !== "default" ||
    maxPrice < 1000;

  return {
    loading,
    searchTerm,
    selectedCategory,
    sortBy,
    maxPrice,
    filteredProducts,
    visibleProducts,
    currentPage,
    totalPages,
    hasActiveFilters,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handleMaxPriceChange,
    goToPage,
    resetFilters,
  };
}