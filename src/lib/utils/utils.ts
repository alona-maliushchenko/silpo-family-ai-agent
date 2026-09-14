export function cn(
    ...classes: Array<string | false | null | undefined>
  ) {
    return classes.filter(Boolean).join(" ");
  }
  
  export function formatPrice(price: number) {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH",
      maximumFractionDigits: 0,
    }).format(price);
  }