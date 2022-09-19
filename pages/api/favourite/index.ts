import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (req.method === "POST"){
    const {palavra, userId} = JSON.parse(req.body)

        try {
            const favorito = await prisma.favoritos.create(
                {
                    data : {
                        userId : userId as string,
                        palavra : palavra as string
                    }
                }
            )
            res.json(favorito)
        } catch (e) {
            res.status(505).send({message : "FUBAR"})
        }
        
    }
     else if (req.method === "DELETE"){
    const {palavra, userId} = JSON.parse(req.body)

        const favorito = await prisma.favoritos.delete(
            {
                where : {
                    userId_palavra : {
                        userId : userId as string,
                        palavra : palavra as string
                    }
                }
            }
        )
        res.json(favorito)
    } else if (req.method === "GET") {
        const getId = req.query.userId 
        const getPalavra = req.query.palavra
        const favorito = await prisma.favoritos.findUnique(
            {
                where : {
                    userId_palavra : { 
                        userId : getId as string,
                        palavra : getPalavra as string
                    }
                }
            }
        )
        res.json(favorito)
    }
}