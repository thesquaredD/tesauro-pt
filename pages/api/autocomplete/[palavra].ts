// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

type Data = {
  AutoComplete: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {palavra} = req.query
    const palavras = await prisma.palavras.findMany(
        {
            take : 10,
            where : {a_palavra : {
                startsWith : palavra as string
            }}
        }
    )
    res.json(palavras)
}
