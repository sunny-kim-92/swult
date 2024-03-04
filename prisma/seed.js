import prisma from '../lib/prisma.js'
import {data} from './data/cards.js'

async function main() {
  let promises = []
  let aspectObj = [{create: []}]
  let keywordObj = [{create: []}]
  let traitObj = [{create: []}]
  data.forEach((card) => {
    card.Aspects.forEach((aspect) => {
      aspectObj.create.push({aspect: {
        connectOrCreate: {
          where: {
            name: aspect
          },
          create: {
            name: aspect
          }
        }
      }})
    })
    card.Keywords.forEach((keyword) => {
      keywordObj.create.push({keyword: {
        connectOrCreate: {
          where: {
            name: keyword
          },
          create: {
            name: keyword
          }
        }
      }})
    })
    card.Traits.forEach((trait) => {
      traitObj.create.push({trait: {
        connectOrCreate: {
          where: {
            name: trait
          },
          create: {
            name: trait
          }
        }
      }})
    })
    promises.push(prisma.card.upsert({
      where: { name: card.name },
      create: {
        name: card.Name,
        set: card.Set,
        type: card.Type,
        cost: card.Cost,
        power: card.Power,
        hp: card.Hp,
        frontArt: card.FrontArt,
        frontText: card.FrontText,
        rarity: card.Rarity,
        unique: card.Unique,
        artist: card.Artist,
        doubleSided: card.DoubleSided,
        backText: card.BackText,
        backArt: card.BackArt,
        aspects: aspectObj,
        keywords: keywordObj,
        traits: traitObj,
      }
    }))
  })
  const response = await Promise.all(promises)
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
