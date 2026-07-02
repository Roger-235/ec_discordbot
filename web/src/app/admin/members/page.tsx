export const dynamic = 'force-dynamic'
import prisma from "@/lib/prisma"
import MembersClient from "./MembersClient"

export default async function AdminMembersPage() {
  const members = await prisma.users.findMany({
    orderBy: { studentId: "asc" },
  })
  return <MembersClient members={members} />
}
