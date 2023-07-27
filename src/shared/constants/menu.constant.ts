interface SidebarMenu {
  alt: string;
  href: string;
  image: string;
  label: string;
}

export const SIDEBAR_MENU: SidebarMenu[] = [
  {
    alt: "dashboard-icon",
    href: "/",
    image: "/assets/icons/ic_dashboard.svg",
    label: "Dashboard",
  },
  {
    alt: "products-icon",
    href: "/products",
    image: "/assets/icons/ic_product.svg",
    label: "Products",
  },
  {
    alt: "carts-icon",
    href: "/carts",
    image: "/assets/icons/ic_cart.svg",
    label: "Carts",
  },
];
