import prisma from '@/lib/prisma'

export async function GET() {
    const res = await prisma.card.findMany({
        where: {
            setId: 1
        }
    })
    const leaders = res.filter((card) => card.type == 'Leader')
    const bases = res.filter((card) => card.type == 'Base')
    const allCommons = res.filter((card) => card.rarity == 'C')
    const allUncommons = res.filter((card) => card.rarity == 'U')
    const allRares = res.filter((card) => card.rarity == 'R')
    const allLegendaries = res.filter((card) => card.rarity == 'L')

    const leaderCommons = leaders.filter((card) => card.rarity == 'C')
    const leaderRares = leaders.filter((card) => card.rarity == 'R')

    const baseCommons = bases.filter((card) => card.rarity == 'C')
    const baseRares = bases.filter((card) => card.rarity == 'R')

    const regularCommons = allCommons.filter((card) => {
        return (card.type != 'Leader'
            && card.type != 'Base'
        )
    })
    const regularUncommons = allUncommons.filter((card) => {
        return (card.type != 'Leader'
            && card.type != 'Base'
        )
    })
    const regularRares = allRares.filter((card) => {
        return (card.type != 'Leader'
            && card.type != 'Base'
        )
    })
    const regularLegendaries = allLegendaries.filter((card) => {
        return (card.type != 'Leader'
            && card.type != 'Base'
        )
    })

    // Leader slot
    let leaderRarityCheck = Math.floor(Math.random() * 10) + 1
    let leaderCard = null
    if (leaderRarityCheck === 1) {
        leaderCard = pickRandomCards(leaderRares, 1)
    } else {
        leaderCard = pickRandomCards(leaderCommons, 1)
    }

    // Base slot
    let baseRarityCheck = Math.floor(Math.random() * 10) + 1
    let baseCard = null
    if (baseRarityCheck === 1) {
        baseCard = pickRandomCards(baseRares, 1)
    } else {
        baseCard = pickRandomCards(baseCommons, 1)
    }

    // Common/Uncommon/Rare regular slots
    let commons = pickRandomCards(regularCommons, 9)
    let uncommons = pickRandomCards(regularUncommons, 3)
    let rareCard = null
    let rareCheck = Math.floor(Math.random() * 8) + 1
    if (rareCheck === 1) {
        rareCard = pickRandomCards(regularLegendaries, 1)
    } else {
        rareCard = pickRandomCards(regularRares, 1)
    }

    // Foil slot
    let foilRarityCheck = Math.floor(Math.random() * 13) + 1
    let foilCard = null
    if (foilRarityCheck === 1) {
        let foilRareCheck = Math.floor(Math.random() * 8) + 1
        if (foilRareCheck === 1) {
            foilCard = pickRandomCards(allLegendaries, 1)
        } else {
            foilCard = pickRandomCards(allRares, 1)
        }
    } else if (foilRarityCheck < 5) {
        foilCard = pickRandomCards(allUncommons, 1)
    } else {
        foilCard = pickRandomCards(allCommons, 1)
    }

    let cardList = [...commons, ...uncommons, rareCard, foilCard, leaderCard, baseCard]

    return Response.json({ cards: cardList })
}

function generatePack(cards){
    
}

function pickRandomCards(list, count) {
    let final = []
    let indexes = []
    while (final.length < count) {
        let index = Math.floor(Math.random() * list.length)
        if (indexes.indexOf(index) == -1) {
            final.push(list[index])
            indexes.push(index)
        }
    }
    return final
}