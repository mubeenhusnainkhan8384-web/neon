import {
  Home,
  Search,
  KeyRound,
  FileText,
  Calculator,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/product-research", label: "Product Research", icon: Search },
  { href: "/keywords", label: "Keywords", icon: KeyRound },
  { href: "/listing-builder", label: "Listing Builder", icon: FileText },
  { href: "/profit-calculator", label: "Profit Calculator", icon: Calculator },
  { href: "/projects", label: "My Projects", icon: FolderKanban },
];

