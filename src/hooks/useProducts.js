import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productService";

const ITEMS_PER_PAGE = 4;

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
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

        if (!normalized) return products;

        return products.filter((product) => {
            return (
                product.title.toLowerCase().includes(normalized) ||
                product.description.toLowerCase().includes(normalized)
            );
        });
    }, [products, searchTerm]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
    );

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const visibleProducts = filteredProducts.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return {
        loading,
        searchTerm,
        filteredProducts,
        visibleProducts,
        currentPage,
        totalPages,
        handleSearchChange,
        goToPage,
    };
}