interface SidebarMenu {
  alt: string;
  href: string;
  image: string;
  id: number;
  label: string;
}

export const SIDEBAR_MENU: SidebarMenu[] = [
  {
    alt: "dashboard-icon",
    href: "/",
    image: "/assets/icons/ic_dashboard.svg",
    id: 1,
    label: "Dashboard",
  },
  {
    alt: "products-icon",
    href: "/products",
    image: "/assets/icons/ic_product.svg",
    id: 2,
    label: "Products",
  },
  {
    alt: "carts-icon",
    href: "/carts",
    image: "/assets/icons/ic_cart.svg",
    id: 3,
    label: "Carts",
  },
];
