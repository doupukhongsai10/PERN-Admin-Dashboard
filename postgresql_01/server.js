import 'dotenv/config';
import express from 'express';
import { db } from './db.js';
import { cars } from './schema.js';
import { eq } from 'drizzle-orm';

const app = express();
const port = 3001;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send("Hello from cars API (Neon + Drizzle)!");
});

// GET all cars
router.get('/', async (req, res) => {
    try {
        const allCars = await db.select().from(cars);
        res.json(allCars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET a single car by ID
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [car] = await db.select().from(cars).where(eq(cars.id, id));
        if (!car) return res.status(404).json({ error: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Create a new car
router.post('/', async (req, res) => {
    try {
        const { make, model, year, price } = req.body;
        if (!make || !model || !year || !price) {
            return res.status(400).json({ error: "Please provide make, model, year, and price" });
        }
        const [newCar] = await db.insert(cars).values({ make, model, year: Number(year), price: String(price) }).returning();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT - Update a car
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { make, model, year, price } = req.body;
        const updates = {};
        if (make) updates.make = make;
        if (model) updates.model = model;
        if (year) updates.year = Number(year);
        if (price) updates.price = String(price);

        const [updated] = await db.update(cars).set(updates).where(eq(cars.id, id)).returning();
        if (!updated) return res.status(404).json({ error: 'Car not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Delete a car
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const [deleted] = await db.delete(cars).where(eq(cars.id, id)).returning();
        if (!deleted) return res.status(404).json({ error: 'Car not found' });
        res.json({ message: "Car deleted", car: deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use('/api/v1/cars', router);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));