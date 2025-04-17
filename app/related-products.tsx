import { getRelatedProducts } from "@/lib/db/db";
import ProductCard from "@/components/productCard";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Product } from "@/lib/db/schema";

interface RelatedProductsProps {
  categoryName: string;
  currentProductId: string;
}

export default async function RelatedProducts({
  categoryName,
  currentProductId,
}: RelatedProductsProps) {
  try {
    // Fetch related products
    const relatedProducts = await getRelatedProducts(
      categoryName,
      currentProductId
    );

    // If no related products, don't render this section
    if (relatedProducts.length === 0) {
      return null;
    }

    return (
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          You might also like
        </h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct: Product, index: number) => (
            <motion.div
              key={relatedProduct.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ProductCard product={relatedProduct} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  } catch (error) {
    console.error("Error fetching related products:", error);
    return null;
  }
}
