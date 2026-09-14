"use client";

import { useEffect, useMemo, useState } from "react";

export type CartProduct = {
  id?: string | number;
  productId?: string | number;
  name?: string;
  title?: string;
  price?: number;
  image?: string;
  imageUrl?: string;
  url?: string;
  searchQuery?: string;
};

type CartItem = CartProduct & {
  cartId: string;
  quantity: number;
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleAddToCart = (event: Event) => {
      const customEvent = event as CustomEvent<CartProduct>;
      const product = customEvent.detail;

      if (!product) return;

      const productId = String(
        product.id ??
          product.productId ??
          product.name ??
          product.title ??
          "product",
      );

      setItems((current) => {
        const existing = current.find(
          (item) => item.cartId === productId,
        );

        if (existing) {
          return current.map((item) =>
            item.cartId === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          );
        }

        return [
          ...current,
          {
            ...product,
            cartId: productId,
            quantity: 1,
          },
        ];
      });

      const productName =
        product.name ||
        product.title ||
        "Продукт Сільпо";

      setMessage(
        `"${productName}" додано до кошика`,
      );

      window.setTimeout(() => {
        setMessage("");
      }, 2500);
    };

    window.addEventListener(
      "silpo:add-to-cart",
      handleAddToCart,
    );

    return () => {
      window.removeEventListener(
        "silpo:add-to-cart",
        handleAddToCart,
      );
    };
  }, []);

  const getName = (product: CartProduct) =>
    product.name ||
    product.title ||
    "Продукт Сільпо";

  const getImage = (product: CartProduct) =>
    product.image ||
    product.imageUrl ||
    "";

  const getPrice = (product: CartProduct) => {
    const price = Number(product.price);

    return Number.isFinite(price) ? price : 0;
  };

  const increaseQuantity = (cartId: string) => {
    setItems((current) =>
      current.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (cartId: string) => {
    setItems((current) =>
      current
        .map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (cartId: string) => {
    setItems((current) =>
      current.filter(
        (item) => item.cartId !== cartId,
      ),
    );
  };

  const totalItems = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  }, [items]);

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum +
        getPrice(item) * item.quantity,
      0,
    );
  }, [items]);

  return (
    <section className="mt-10">
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        {/* HEADER */}
        <div className="border-b border-gray-100 p-6 md:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider !text-[#00A651]">
                Shopping Cart
              </p>

              <h2 className="mt-1 text-2xl font-bold !text-gray-900">
                Ваш кошик
              </h2>
            </div>

            <div className="rounded-full bg-[#E8F7EF] px-4 py-2 text-sm font-semibold !text-[#008A45]">
              {totalItems}{" "}
              {totalItems === 1
                ? "товар"
                : "товарів"}
            </div>
          </div>
        </div>

        {/* EMPTY CART */}
        {items.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F7EF] text-3xl">
              🛒
            </div>

            <h3 className="text-xl font-bold !text-gray-900">
              Кошик порожній
            </h3>

            <p className="mt-2 text-sm !text-gray-500">
              Натисніть «+ Кошик» біля
              потрібного товару.
            </p>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="divide-y divide-gray-100">
              {items.map((item) => {
                const name = getName(item);
                const image = getImage(item);
                const price = getPrice(item);

                return (
                  <div
                    key={item.cartId}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center md:p-6"
                  >
                    {/* IMAGE */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#E8F7EF]">
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-2xl">
                          🛒
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold !text-gray-900">
                        {name}
                      </h3>

                      <p className="mt-1 text-sm !text-[#00A651]">
                        {price > 0
                          ? `${price.toFixed(2)} ₴`
                          : "Ціна у Сільпо"}
                      </p>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(
                            item.cartId,
                          )
                        }
                        aria-label="Зменшити кількість"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-lg font-semibold !text-gray-700 transition hover:bg-gray-50"
                      >
                        −
                      </button>

                      <span className="w-6 text-center font-semibold !text-gray-900">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(
                            item.cartId,
                          )
                        }
                        aria-label="Збільшити кількість"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-lg font-semibold !text-gray-700 transition hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>

                    {/* PRICE */}
                    <div className="min-w-[100px] text-right">
                      <p className="font-bold !text-gray-900">
                        {price > 0
                          ? `${(
                              price *
                              item.quantity
                            ).toFixed(2)} ₴`
                          : "—"}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(
                            item.cartId,
                          )
                        }
                        className="mt-1 text-xs font-medium !text-red-500 transition hover:!text-red-600"
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TOTAL */}
            <div className="border-t border-gray-100 bg-[#F7F8F6] p-6 md:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm !text-gray-500">
                    Орієнтовна сума
                  </p>

                  <p className="mt-1 text-3xl font-bold !text-[#00A651]">
                    {total.toFixed(2)} ₴
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMessage(
                      "Кошик готовий до оформлення в Сільпо",
                    );

                    window.setTimeout(() => {
                      setMessage("");
                    }, 3000);
                  }}
                  className="rounded-full bg-[#00A651] px-8 py-4 text-sm font-bold !text-white shadow-sm transition hover:bg-[#008F46]"
                >
                  Оформити кошик →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-medium !text-white shadow-lg">
          ✓ {message}
        </div>
      )}
    </section>
  );
}
