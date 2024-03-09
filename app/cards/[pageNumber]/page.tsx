import prisma from '@/lib/prisma'

async function getData(pageNumber: Number) {
    const res = await prisma.card.findMany({
        skip: pageNumber * 20,
        take: 20
    })
    return res
}

export default async function Page({
    params: { pageNumber },
}: {
    params: { pageNumber: Number}
}) {
    const cards = await getData(pageNumber)
    return (
    <div>
        {
            cards.map((card) => {
                return(
                <div key={card.number}>
                    <img src={card.frontArt}></img>
                </div>
            )})
        }
    </div>
    )
}