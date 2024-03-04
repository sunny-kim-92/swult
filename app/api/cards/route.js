import prisma from '@/lib/prisma'

export async function GET() {
    const res = await prisma.card.findMany()
    const data = res
    console.log(Math.floor(Math.random() * 16))
    return Response.json({ data })
}