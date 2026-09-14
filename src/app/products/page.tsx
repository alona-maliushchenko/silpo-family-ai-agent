"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";

type Product = {
  id?: string;
  productId?: string;
  name?: string;
  title?: string;
  price?: number;
  image?: string;
  imageUrl?: string;
  url?: string;
  searchQuery?: string;
};

type ProductResponse = {
  products?: unknown;
  error?: string;
};

function normalizeProducts(data: unknown): Product[] {
  if (!data) return [];

  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;

    if (Array.isArray(obj.products)) {
      return obj.products as Product[];
    }

    if (Array.isArray(obj.items)) {
      return obj.items as Product[];
    }

    if (Array.isArray(obj.results)) {
      return obj.results as Product[];
    }

    if (
      obj.structuredContent &&
      typeof obj.structuredContent === "object"
    ) {
      const structured =
        obj.structuredContent as Record<string, unknown>;

      if (Array.isArray(structured.products)) {
        return structured.products as Product[];
      }

      if (Array.isArray(structured.items)) {
        return structured.items as Product[];
      }

      if (Array.isArray(structured.results)) {
        return structured.results as Product[];
      }
    }

    if (Array.isArray(obj.content)) {
      const content = obj.content as Array<{
        type?: string;
        text?: string;
      }>;

      for (const item of content) {
        if (item.type === "text" && item.text) {
          try {
            const parsed = JSON.parse(item.text);

            if (Array.isArray(parsed)) {
              return parsed as Product[];
            }

            if (
              parsed?.products &&
              Array.isArray(parsed.products)
            ) {
              return parsed.products as Product[];
            }

            if (
              parsed?.items &&
              Array.isArray(parsed.items)
            ) {
              return parsed.items as Product[];
            }

            if (
              parsed?.results &&
              Array.isArray(parsed.results)
            ) {
              return parsed.results as Product[];
            }
          } catch {
            // text is not JSON
          }
        }
      }
    }
  }

  return [];
}

export default function ProductsPage() {
  const [shoppingList, setShoppingList] =
    useState<string[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const savedMealPlan =
          localStorage.getItem("mealPlan");

        if (!savedMealPlan) {
          setError("Meal Plan не знайдено.");
          setLoading(false);
          return;
        }

        const mealPlan =
          JSON.parse(savedMealPlan);

        const list = Array.isArray(
          mealPlan.shoppingList,
        )
          ? mealPlan.shoppingList
          : [];

        setShoppingList(list);

        if (list.length === 0) {
          setLoading(false);
          return;
        }

        console.log(
          "Searching products:",
          list,
        );

        const response = await fetch(
          "/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              shoppingList: list,
            }),
          },
        );

        const data: ProductResponse =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Не вдалося завантажити продукти",
          );
        }

        console.log(
          "Products API response:",
          data,
        );

        const normalized =
          normalizeProducts(
            data.products,
          );

        console.log(
          "Normalized products:",
          normalized,
        );

        setProducts(normalized);
      } catch (err) {
        console.error(
          "Products page error:",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Не вдалося завантажити продукти.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const getProductName = (
    product: Product,
  ) => {
    return (
      product.name ||
      product.title ||
      "Продукт Сільпо"
    );
  };

  const getProductImage = (
    product: Product,
  ) => {
    return (
      product.image ||
      product.imageUrl ||
      ""
    );
  };

  const getProductPrice = (
    product: Product,
  ) => {
    if (
      typeof product.price === "number" &&
      Number.isFinite(product.price)
    ) {
      return `${product.price.toFixed(2)} ₴`;
    }

    return "Ціна у Сільпо";
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8F6] px-4">
        <div className="text-center">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#00A651]" />

          <h1 className="text-xl font-semibold text-gray-900">
            Шукаємо продукти у Сільпо...
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            AI підбирає товари зі списку покупок
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8F6] px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
            ⚠️
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Не вдалося завантажити продукти
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/results"
              className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              ← До Meal Plan
            </Link>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="rounded-full bg-[#00A651] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#008F46]"
            >
              Спробувати ще раз
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8F6] text-[#1F2937]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6">
          <Link
            href="/results"
            className="text-sm font-semibold text-[#00A651] transition hover:text-[#008F46]"
          >
            ← Meal Plan
          </Link>

          <div className="font-bold text-[#00A651]">
            Сільпо
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <section className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#00A651]">
            Silpo Products
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Продукти для вашого меню
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
                Знайшли товари у Сільпо на основі
                вашого персонального списку покупок.
              </p>
            </div>

            <div className="w-fit rounded-full bg-[#E8F7EF] px-4 py-2 text-sm font-medium text-[#008A45]">
              {shoppingList.length} продуктів у списку
            </div>
          </div>
        </section>

        {products.length === 0 ? (
          <section className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F7EF] text-3xl">
              🛒
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Продукти не знайдено
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
              Спробуйте повернутися до Meal Plan
              та сформувати список покупок ще раз.
            </p>

            <Link
              href="/results"
              className="mt-6 inline-flex rounded-full bg-[#00A651] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008F46]"
            >
              ← Повернутися до Meal Plan
            </Link>
          </section>
        ) : (
          <>
            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map(
                (product, index) => {
                  const name =
                    getProductName(product);

                  const image =
                    getProductImage(product);

                  const price =
                    getProductPrice(product);

                  const productId =
                    product.id ||
                    product.productId ||
                    name;

                  return (
                    <article
                      key={`${productId}-${product.searchQuery || "product"}-${index}`}
                      className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="relative h-56 w-full overflow-hidden bg-[#E8F7EF]">
                        {image ? (
                          <Image
                            src={image}
                            alt={name}
                            fill
                            unoptimized
                            className="object-contain p-5"
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center">
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                              🛒
                            </div>

                            <p className="text-xs font-medium text-[#008A45]">
                              Зображення товару
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              не знайдено
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h2 className="min-h-[48px] text-base font-semibold leading-6 text-gray-900">
                          {name}
                        </h2>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className="text-lg font-bold text-[#00A651]">
                            {price}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              window.dispatchEvent(
                                new CustomEvent(
                                  "silpo:add-to-cart",
                                  {
                                    detail: product,
                                  },
                                ),
                              );
                            }}
                            className="rounded-full bg-[#00A651] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#008F46]"
                          >
                            + Кошик
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </section>

            {/* КОШИК */}
            <Cart />

            <section className="mt-10 overflow-hidden rounded-3xl bg-[#00A651] p-6 text-white shadow-sm md:p-8">
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/75">
                    Shopping Cart
                  </p>

                  <h2 className="text-2xl font-bold">
                    Ваш список готовий до покупок
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                    Оберіть потрібні товари та
                    додайте їх до кошика Сільпо.
                  </p>
                </div>

                <Link
                  href="/results"
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#00A651] shadow-sm transition hover:bg-gray-50"
                >
                  ← До Meal Plan
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
