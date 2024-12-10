import fastify, {FastifyRequest,FastifyReply} from 'fastify';
import { PrismaClient } from '@prisma/client';
import type { RestoParams } from './types/global';
import autoLoad from '@fastify/autoload'

import path from "node:path";

const server = fastify();
export const prisma = new PrismaClient()
//register all paths in routes
server.register(autoLoad, {
    dir: path.join(__dirname, 'routes'),
    routeParams: true
});

server.get('/',async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    return `<h1 style="color: rebeccapurple">Welcome to NomBuddy v0.1!</h1>`
})

server.patch('/:restoName/menus/:id', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    const { restoName, id } = request.params;
    // Update menu by ID
    // Example: const updatedMenu = await prisma.menu.update({ where: { id: Number(id) }, data: request.body });
    return `Update menu ${id} for restaurant ${restoName}`;
});

// Routes for restaurant employees
server.get('/:restoName/persons', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    const { restoName } = request.params;
    // Fetch all employees for a restaurant
    // Example: const employees = await prisma.employee.findMany({ where: { restaurantName: restoName } });
    return `Fetch employees for restaurant ${restoName}`;
});

server.post('/:restoName/persons', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    const { restoName } = request.params;
    // Add a new employee
    // Example: const newEmployee = await prisma.employee.create({ data: { ...request.body, restaurantName: restoName } });
    return `Add employee for restaurant ${restoName}`;
});

server.delete('/:restoName/persons/:id', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    const { restoName, id } = request.params;
    // Delete employee by ID
    // Example: await prisma.employee.delete({ where: { id: Number(id) } });
    return `Delete employee ${id} for restaurant ${restoName}`;
});

// Routes for restaurant orders
server.get('/:restoName/orders', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    const { restoName } = request.params;
    // Fetch all orders for a restaurant
    // Example: const orders = await prisma.order.findMany({ where: { restaurantName: restoName } });
    return `Fetch orders for restaurant ${restoName}`;
});

server.post('/:restoName/orders', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    const { restoName } = request.params;
    // Add a new order
    // Example: const newOrder = await prisma.order.create({ data: { ...request.body, restaurantName: restoName } });
    return `Add order for restaurant ${restoName}`;
});

server.get('/:restoName/orders/:id', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    const { restoName, id } = request.params;
    // Fetch specific order by ID
    // Example: const order = await prisma.order.findUnique({ where: { id: Number(id) } });
    return `Fetch order ${id} for restaurant ${restoName}`;
});

server.patch('/:restoName/orders/:id', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {

    const { restoName, id } = request.params;
    // Update order status by ID
    // Example: const updatedOrder = await prisma.order.update({ where: { id: Number(id) }, data: request.body });
    return `Update order ${id} for restaurant ${restoName}`;
});

server.delete('/:restoName/orders/:id', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    const { restoName, id } = request.params;
    // Delete order by ID
    // Example: await prisma.order.delete({ where: { id: Number(id) } });
    return `Delete order ${id} for restaurant ${restoName}`;
});

// Authentication routes
server.post('/login', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    // User login
    // Example: const user = await authenticateUser(request.body);
    return 'User logged in';
});

server.post('/logout', async (request:FastifyRequest<{ Params: RestoParams }>, reply) => {
    // User logout
    // Example: destroySession();
    return 'User logged out';
});

// Start the server
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
