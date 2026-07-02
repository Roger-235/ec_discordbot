"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/admin", label: "後台首頁" },
  { href: "/admin/members", label: "會員列表" },
  { href: "/admin/members/new", label: "新增會員" },
  { href: "/admin/members/import", label: "批量匯入" },
  { href: "/admin/cores", label: "幹部管理" },
  { href: "/admin/posts", label: "活動管理" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex gap-4">
      <aside className="w-40 shrink-0">
        <div className="pcb-card py-3">
          <p className="silk text-[#4a7a4a] text-xs px-4 py-2">ADMIN · PANEL</p>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2.5 text-xs transition-colors ${
                pathname === link.href
                  ? "text-[#d4a843] border-l-2 border-[#b87333]"
                  : "text-[#4a7a4a] hover:text-[#c8d8c8]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  )
}
