"use client"
import React from "react";
import { Package, ShoppingBag, Settings } from "lucide-react";
import SideBarItems from "@/components/merch/clientUi/SideBarItems";
const navItems = [
  { name: "Products", href: "/shop/admin/products", icon: Package },
  { name: "Orders", href: "/shop/admin/orders", icon: ShoppingBag },
  { name: "Settings", href: "/shop/admin/settings", icon: Settings },
];
function SideBar() {
  return (
    <ul className="space-y-2">
      {navItems.map((item) => {
        return (
          <li key={item.name}>
            <SideBarItems
              href={item.href}
              name={item.name}
              icon={item.icon}
            ></SideBarItems>
          </li>
        );
      })}
    </ul>
  );
}

export default SideBar;
