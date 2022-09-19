// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RedoTwoTone } from '@mui/icons-material'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {user} = req.query
    if (req.method === "POST"){
        const palavras = await prisma.profiles.create(
            {
                data : {id : user as string}
            }
        )
        res.json(palavras)
    } else if (req.method === "GET"){
        const palavras = await prisma.profiles.findUnique(
            {
                where : {id : user as string}
            }
        )
        res.json(palavras)
    }
}
