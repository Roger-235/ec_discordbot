import prisma from "@/lib/prisma"

export async function POST(request: Request){
    const body = await request.json()
    const user = await prisma.users.create({
        data: {
            studentId: body.studentId,
            year: body.year,
            name: body.name,
            class: body.class
        }
    })
    return Response.json(user, { status: 201 })
}
export async function GET(request: Request){
    const users = await prisma.users.findMany()
    return Response.json(users)
}