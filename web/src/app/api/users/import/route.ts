import prisma from "@/lib/prisma"
import { Result } from "pg"
import * as XLSX from "xlsx"

export async function POST(request: Request){
    const formData = await request.formData()
    const file = formData.get("file") as File
    const buffer = await file.arrayBuffer()
    
    const workbook = XLSX.read(buffer)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const row = XLSX.utils.sheet_to_json(sheet) as {
        studentId: string,
        year: number,
        class: string,
        name: string
    }[]
    const users = await prisma.users.createMany({
        data: row,
        skipDuplicates: true,
    })
    return Response.json({ status: 201 })
}