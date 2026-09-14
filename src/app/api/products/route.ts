import { NextResponse } from "next/server";
import { createSilpoMcpClient } from "@/lib/mcp/client";

type Product = {
  id?: string | number;
  productId?: string | number;
  name?: unknown;
  title?: unknown;
  productName?: unknown;
  price?: unknown;
  oldPrice?: unknown;
  image?: unknown;
  imageUrl?: unknown;
  url?: unknown;
  available?: unknown;
  stock?: unknown;
  searchQuery?: string;
  [key: string]: unknown;
};

function getName(product: Product): string {
  return String(
    product.name ??
      product.title ??
      product.productName ??
      "",
  ).trim();
}

function getId(product: Product): string {
  return String(
    product.id ??
      product.productId ??
      getName(product),
  );
}

function looksLikeProduct(
  value: Record<string, unknown>,
): boolean {
  const hasId =
    value.id !== undefined ||
    value.productId !== undefined;

  const hasName =
    value.name !== undefined ||
    value.title !== undefined ||
    value.productName !== undefined;

  return hasId && hasName;
}

/*
 * MCP може повертати товари глибоко всередині
 * results / products / data / structuredContent тощо.
 *
 * Тому шукаємо товари рекурсивно.
 */
function extractProducts(
  data: unknown,
  query?: string,
): Product[] {
  if (data === null || data === undefined) {
    return [];
  }

  if (Array.isArray(data)) {
    return data.flatMap((item: unknown) =>
      extractProducts(item, query),
    );
  }

  if (typeof data !== "object") {
    return [];
  }

  const obj = data as Record<string, unknown>;

  if (looksLikeProduct(obj)) {
    return [
      {
        ...obj,
        searchQuery: query,
      },
    ];
  }

  const currentQuery =
    typeof obj.query === "string"
      ? obj.query
      : query;

  return Object.values(obj).flatMap(
    (value: unknown) =>
      extractProducts(value, currentQuery),
  );
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/ґ/g, "г")
    .trim();
}

const excludedWords = [
  "сигар",
  "цигар",
  "тютюн",
  "табак",
  "алкогол",
  "горілк",
  "вино",
  "пив",
  "корм для кот",
  "корм для собак",
  "корм для твар",
  "шампун",
  "зубна паст",
  "зубн паст",
  "космет",
  "парфум",
  "книга",
  "журнал",
];

function isExcluded(name: string): boolean {
  const text = normalize(name);

  return excludedWords.some((word) =>
    text.includes(normalize(word)),
  );
}

function isRelevant(
  productName: string,
  query: string,
): boolean {
  const name = normalize(productName);
  const q = normalize(query);

  if (!name || !q) {
    return false;
  }

  if (isExcluded(name)) {
    return false;
  }

  if (q.includes("вівся") || q.includes("овес")) {
    return (
      name.includes("вівся") ||
      name.includes("овес")
    );
  }

  if (q.includes("банан")) {
    return name.includes("банан");
  }

  if (q.includes("ягод")) {
    return (
      name.includes("ягод") ||
      name.includes("полуниц") ||
      name.includes("мали") ||
      name.includes("чорниц") ||
      name.includes("лохин") ||
      name.includes("смородин") ||
      name.includes("ожин")
    );
  }

  if (q.includes("молок")) {
    return name.includes("молок");
  }

  if (
    q.includes("кур") &&
    (q.includes("філе") ||
      q.includes("филе"))
  ) {
    return (
      name.includes("кур") &&
      (name.includes("філе") ||
        name.includes("филе"))
    );
  }

  if (q.includes("греч")) {
    return name.includes("греч");
  }

  if (
    q.includes("помід") ||
    q.includes("помид")
  ) {
    return (
      name.includes("помід") ||
      name.includes("помид")
    );
  }

  if (
    q.includes("огір") ||
    q.includes("огур")
  ) {
    return (
      name.includes("огір") ||
      name.includes("огур")
    );
  }

  if (q.includes("морк")) {
    return name.includes("морк");
  }

  if (q.includes("риб")) {
    return name.includes("риб");
  }

  if (q.includes("картоп")) {
    return name.includes("картоп");
  }

  if (q === "салат") {
    return name.includes("салат");
  }

  if (
    q.includes("яйц") ||
    q.includes("яєч")
  ) {
    return (
      name.includes("яйц") ||
      name.includes("яєч")
    );
  }

  if (q === "сир") {
    return (
      name.includes("сир") &&
      !name.includes("сироп")
    );
  }

  if (q === "паста") {
    return (
      name.includes("макарон") ||
      name.includes("спагет") ||
      name.includes("пенне") ||
      name.includes("фузіл") ||
      name.includes("фузил") ||
      name.includes("фарфал") ||
      name.includes("вермішел") ||
      name.includes("вермишел") ||
      name.includes("локшин") ||
      name.includes("канелон") ||
      name.includes("ріжк") ||
      name.includes("рожк") ||
      name.includes("лапша")
    );
  }

  if (q.includes("цибул")) {
    return name.includes("цибул");
  }

  if (q === "рис") {
    return name.includes("рис");
  }

  if (
    q.includes("індич") ||
    q.includes("индич") ||
    q.includes("індюш") ||
    q.includes("индюш")
  ) {
    return (
      name.includes("індич") ||
      name.includes("индич") ||
      name.includes("індюш") ||
      name.includes("индюш")
    );
  }

  if (q.includes("брокол")) {
    return name.includes("брокол");
  }

  if (q.includes("булгур")) {
    return name.includes("булгур");
  }

  const words = q
    .split(/\s+/)
    .filter(
      (word: string) => word.length >= 3,
    );

  return words.every((word: string) =>
    name.includes(word),
  );
}

function isAvailable(
  product: Product,
): boolean {
  if (product.available === false) {
    return false;
  }

  const stock = Number(product.stock);

  if (
    Number.isFinite(stock) &&
    stock <= 0
  ) {
    return false;
  }

  return true;
}

export async function POST(
  request: Request,
) {
  console.log(
    "=== SILPO PRODUCTS SEARCH ===",
  );

  try {
    const body = await request.json();

    const shoppingList: string[] =
      Array.isArray(body?.shoppingList)
        ? body.shoppingList
            .map((item: unknown) =>
              String(item).trim(),
            )
            .filter(
              (item: string) => item.length > 0,
            )
        : [];

    console.log(
      "Shopping list:",
      shoppingList,
    );

    if (shoppingList.length === 0) {
      return NextResponse.json({
        products: [],
        found: 0,
        notFound: [],
      });
    }

    const client =
      await createSilpoMcpClient();

    console.log(
      "Calling Silpo MCP...",
    );

    const result =
      await client.callTool({
        name: "silpo_find_products_batch",

        arguments: {
          branchId:
            "1edb7351-d076-60fe-a545-51c4e9ef1e54",

          deliveryType:
            "DeliveryHome",

          timeslotStart:
            "2026-09-14T18:00:00",

          timeslotEnd:
            "2026-09-14T21:00:00",

          products: shoppingList,

          limit: 30,
        },
      });

    console.log(
      "MCP result received",
    );

    const extracted =
      extractProducts(result);

    console.log(
      "Extracted products:",
      extracted.length,
    );

    /*
     * Видаляємо дублікати.
     */
    const uniqueProducts =
      new Map<string, Product>();

    extracted.forEach(
      (product: Product) => {
        const id = getId(product);

        if (!uniqueProducts.has(id)) {
          uniqueProducts.set(id, product);
        }
      },
    );

    const rawProducts =
      Array.from(
        uniqueProducts.values(),
      );

    console.log(
      "Raw products:",
      rawProducts.length,
    );

    if (rawProducts.length > 0) {
      console.log(
        "First product:",
        {
          id: getId(rawProducts[0]),
          name: getName(rawProducts[0]),
          price: rawProducts[0].price,
          stock: rawProducts[0].stock,
          available:
            rawProducts[0].available,
        },
      );
    }

    /*
     * Для кожного продукту зі Shopping List
     * показуємо ВСІ відповідні варіанти.
     */
    const finalProducts: Product[] = [];
    const foundItems = new Set<string>();

    shoppingList.forEach(
      (query: string) => {
        const matches =
          rawProducts.filter(
            (product: Product) => {
              const name =
                getName(product);

              return (
                isAvailable(product) &&
                isRelevant(name, query)
              );
            },
          );

        console.log(
          `"${query}" → ${matches.length} products`,
        );

        if (matches.length > 0) {
          foundItems.add(query);
        }

        matches.forEach(
          (product: Product) => {
            finalProducts.push({
              ...product,
              searchQuery: query,
            });
          },
        );
      },
    );

    /*
     * Фінальне видалення дублікатів.
     */
    const finalMap =
      new Map<string, Product>();

    finalProducts.forEach(
      (product: Product) => {
        const key =
          `${getId(product)}__${product.searchQuery}`;

        if (!finalMap.has(key)) {
          finalMap.set(key, product);
        }
      },
    );

    const products =
      Array.from(finalMap.values());

    const notFound =
      shoppingList.filter(
        (item: string) =>
          !foundItems.has(item),
      );

    console.log(
      "=== FINAL RESPONSE ===",
    );

    console.log(
      "Found:",
      products.length,
    );

    console.log(
      "Not found:",
      notFound.length,
    );

    await client.close();

    return NextResponse.json({
      products,
      found: products.length,
      notFound,
    });
  } catch (error) {
    console.error(
      "SILPO PRODUCTS ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load Silpo products",
      },
      {
        status: 500,
      },
    );
  }
}