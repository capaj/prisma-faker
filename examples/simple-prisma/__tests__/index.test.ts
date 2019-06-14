import { seed } from '../../../packages/prisma-faker/src'
import * as photon from '@generated/photon'

beforeAll(async () => {
  const data = await seed(
    photon,
    bag => ({
      Blog: {
        amount: 5,
        factory: {
          name: bag.faker.sentence,
          viewCount: bag.faker.integer,
        },
      },
      Author: {
        amount: 3,
        factory: {
          name: bag.faker.name,
        },
      },
      Post: {
        amount: 10,
        factory: {
          title: bag.faker.sentence,
        },
      },
    }),
    {
      persist: true,
    },
  )

  console.log(data)
})

test('user is queried correctly', async () => {
  const client = new photon.Photon()
  const posts = await client.blogs({})

  expect(posts.length).toBe(5)

  client.disconnect()
})
