import fastify from 'fastify'

const server = fastify()

server.get('/:username', async (request, reply) => {
    const params= request.params
    // @ts-ignore
    const name:string = params.username
    return `Hello ${name!=""?name:"world"}!`
})

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})