import type { Product } from "@/lib/product-data";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
  onWhatsappShare: (product: Product) => void;
  onCopyLink: (product: Product) => void;
  page: number;
  pageSize: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
}

export function ProductGrid({ products, isLoading, onProductClick, onWhatsappShare, onCopyLink, page, pageSize, totalProducts, onPageChange }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg animate-pulse">
            <div className="w-full h-64 bg-gray-300 rounded-t-xl"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="flex space-x-3">
                <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
                <div className="flex-1 h-10 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-playfair font-bold text-elegant-black mb-4">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.code}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            onClick={() => onProductClick(product)}
            data-testid={`product-card-${product.code}`}
          >
            <div className="relative overflow-hidden rounded-t-xl">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {(product.isNewProduct || product.isOnSale) && (
                <div className="absolute top-4 right-4 flex flex-row items-center space-x-1 z-10">
                  {product.isNewProduct && (
                    <div className="bg-luxury-gold text-black px-3 py-1 rounded-full text-sm font-semibold shadow">
                      New
                    </div>
                  )}
                  {product.isOnSale && (
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                      Sale
                    </div>
                  )}
                </div>
              )}
              {product.isFeatured && !product.isNewProduct && !product.isOnSale && (
                <div className="absolute top-4 right-4 bg-luxury-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-playfair font-semibold text-xl text-elegant-black mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-1">{product.description}</p>
              <p className="text-luxury-gold font-semibold mb-4">Code: {product.code}</p>
              <div className="flex space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWhatsappShare(product);
                  }}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300"
                  data-testid={`button-whatsapp-${product.code}`}
                >
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085" />
                    </svg>
                    Enquire
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopyLink(product);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
                  data-testid={`button-copy-link-${product.code}`}
                >
                  <svg className="inline w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Copy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          {/* Previous button */}
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Page number buttons (sliding window of 3) */}
          {(() => {
            const totalPages = Math.ceil(totalProducts / pageSize);
            let start = Math.max(1, page - 1);
            let end = Math.min(totalPages, start + 2);
            // Adjust start if we're at the end
            if (end - start < 2) {
              start = Math.max(1, end - 2);
            }
            const pages = [];
            for (let p = start; p <= end; p++) {
              pages.push(p);
            }
            return pages.map((p) => (
              <button
                key={p}
                className={`px-4 py-2 rounded-lg font-medium ${p === page ? 'bg-luxury-gold text-black' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-300'}`}
                onClick={() => onPageChange(p)}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            ));
          })()}
          {/* Next button */}
          <button
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            onClick={() => onPageChange(page + 1)}
            disabled={page === Math.ceil(totalProducts / pageSize) || totalProducts === 0}
            aria-label="Next page"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
