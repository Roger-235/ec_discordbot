"use client"
import { useState } from "react"

type User = {
  studentId: string
  name: string
  class: string
  year: number
  isPaid: boolean
  point: number
}

export default function MembersClient({ members }: { members: User[] }) {
  const [query, setQuery] = useState("")

  const filtered = members.filter(
    (m) =>
      m.studentId.toLowerCase().includes(query.toLowerCase()) ||
      m.name.includes(query)
  )

  return (
    <div className="space-y-3">
      <div className="pcb-card px-8 py-5 flex items-center justify-between">
        <div>
          <span className="silk block mb-2">DATA-BUS · CH=MEMBERS</span>
          <h1 className="text-3xl font-black text-[#e8f0e8]">會員列表</h1>
        </div>
      </div>

      <div className="pcb-card px-6 py-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋學號或姓名..."
          className="w-full border border-[#4a8a4e] bg-[#1a4a1e] text-[#c8d8c8] placeholder-[#4a8a4e] px-4 py-2.5 text-xs focus:outline-none focus:border-[#b87333] transition-colors"
        />
      </div>

      <div className="pcb-card divide-y divide-[#3a6a3e]">
        <div className="grid grid-cols-5 px-6 py-3 silk text-[#4a7a4a] text-xs">
          <span>學號</span>
          <span>姓名</span>
          <span>班級</span>
          <span>繳費</span>
          <span>點數</span>
        </div>
        {filtered.length === 0 && (
          <p className="px-6 py-8 silk text-[#4a7a4a]">查無資料</p>
        )}
        {filtered.map((m) => (
          <div key={m.studentId} className="grid grid-cols-5 px-6 py-3 text-xs hover:bg-[#b87333]/5 transition-colors">
            <span className="silk text-[#c8d8c8]">{m.studentId}</span>
            <span className="text-[#c8d8c8]">{m.name}</span>
            <span className="text-[#4a7a4a]">{m.class}</span>
            <span className={m.isPaid ? "text-[#b87333]" : "text-red-400"}>
              {m.isPaid ? "已繳費" : "未繳費"}
            </span>
            <span className="text-[#c8d8c8]">{m.point}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
