"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ImportMembersPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<number | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError("")
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/users/import", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      const data = await res.json()
      setResult(data.count)
    } else {
      setError("ERR · 匯入失敗")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-3">
      <div className="pcb-card px-8 py-5">
        <Link href="/admin" className="silk hover:text-[#c8d8c8] transition-colors inline-block mb-4">
          ← 管理後台
        </Link>
        <span className="silk block mb-2">WRITE · IMPORT-MEMBERS</span>
        <h1 className="text-3xl font-black text-[#e8f0e8]">批量匯入會員</h1>
      </div>

      <div className="pcb-card p-8 max-w-xl space-y-5">
        <div className="pcb-card p-4 text-xs text-[#4a7a4a] space-y-1">
          <p className="silk mb-2"># EXCEL 欄位格式</p>
          <p>studentId · name · year · class</p>
          <p>C114001 · 王小明 · 114 · 電子二甲</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <span className="silk block mb-2 text-[#4a7a4a]"># 選擇檔案（.xlsx）</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
              className="w-full border border-[#4a8a4e] bg-[#1a4a1e] text-[#c8d8c8] px-4 py-2.5 text-xs focus:outline-none focus:border-[#b87333] transition-colors file:mr-4 file:border-0 file:bg-transparent file:text-[#4a7a4a] file:text-xs"
            />
          </div>

          {error && <p className="silk text-red-400 text-xs">{error}</p>}
          {result !== null && (
            <p className="silk text-[#b87333] text-xs">✓ 成功匯入 {result} 筆資料</p>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full border border-[#b87333] text-[#d4a843] hover:bg-[#b87333]/10 disabled:opacity-40 py-2.5 text-xs tracking-widest transition-colors"
          >
            {loading ? "匯入中..." : "匯入"}
          </button>
        </form>
      </div>
    </div>
  )
}
