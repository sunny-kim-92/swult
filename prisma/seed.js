import { PrismaClient } from '@prisma/client'
import { aspects, keywords, traits, sets, cards } from './data/data.js'
const prisma = new PrismaClient()

async function main() {
  // Sets
  let setPromises = []
  sets.forEach((set) => {
    setPromises.push(prisma.set.create({
      data: {
        name: set.name,
        id: set.id
      }
    }))
  })
  // Aspects
  let aspectPromises = []
  aspects.forEach((aspect) => {
    aspectPromises.push(prisma.aspect.create({
      data: {
        name: aspect.name,
        color: aspect.color
      }
    }))
  })
  // Keywords
  let keywordPromises = []
  keywords.forEach((keyword) => {
    keywordPromises.push(prisma.keyword.create({
      data: {
        name: keyword.name,
        description: keyword.description
      }
    }))
  })
  // Traits
  let traitPromises = []
  traits.forEach((trait) => {
    traitPromises.push(prisma.trait.create({
      data: {
        name: trait.name
      }
    }))
  })
  // Cards
  let cardPromises = []
  let aspectObj = { create: [] }
  let keywordObj = { create: [] }
  let traitObj = { create: [] }
  cards.forEach((card) => {
    aspectObj = { create: [] }
    keywordObj = { create: [] }
    traitObj = { create: [] }
    card.Aspects?.forEach((aspect) => {
      aspectObj.create.push({
        aspect: {
          connectOrCreate: {
            where: {
              name: aspect
            },
            create: {
              name: aspect,
              color: 'test color'
            }
          }
        }
      })
    })
    card.Keywords?.forEach((keyword) => {
      keywordObj.create.push({
        keyword: {
          connectOrCreate: {
            where: {
              name: keyword
            },
            create: {
              name: keyword,
              description: 'test description'
            }
          }
        }
      })
    })
    card.Traits?.forEach((trait) => {
      traitObj.create.push({
        trait: {
          connectOrCreate: {
            where: {
              name: trait
            },
            create: {
              name: trait
            }
          }
        }
      })
    })
    cardPromises.push(prisma.card.create({
      data: {
        name: card.Name,
        type: card.Type,
        cost: parseInt(card.Cost),
        power: parseInt(card.Power),
        hp: parseInt(card.HP),
        subtitle: card.Subtitle,
        number: card.Number,
        frontArt: card.FrontArt,
        frontText: card.FrontText,
        rarity: card.Rarity,
        unique: card.Unique,
        artist: card.Artist,
        doubleSided: card.DoubleSided,
        backText: card.BackText,
        backArt: card.BackArt,
        aspectsOnCards: aspectObj,
        keywordsOnCards: keywordObj,
        traitsOnCards: traitObj,
        setId: card.Set
      }
    }))
  })
  await Promise.all(aspectPromises)
  await Promise.all(keywordPromises)
  await Promise.all(traitPromises)
  await Promise.all(setPromises)
  await Promise.all(cardPromises)
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
