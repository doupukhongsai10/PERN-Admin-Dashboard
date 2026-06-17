import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022, price: 300000 },
    { id: 2, make: 'Tesla', model: 'Model S', year: 2023, price: 250000 },
    { id: 3, make: 'Ford', model: 'F-150', year: 2022, price: 340000 }
];

const router = express.Router();

// Get all cars
router.get('/', (req, res) => {
    res.json(cars);
});

// Get a single car by ID
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id);

    if (!car) {
        return res.status(404).send('Car not found');
    }
    res.json(car);
});

// Create a new car
router.post('/', (req, res) => {
    const { make, model, year, price } = req.body;
    if (!make || !model || !year || !price) {
        return res.status(400).json({ error: "Missing fields" });
    }
    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year: Number(year),
        price: Number(price)
    };
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Update a car
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const carIndex = cars.findIndex((car) => car.id === id);

    if (carIndex === -1) {
        return res.status(404).send('Car not found');
    }

    // Merge the updated fields from the request body
    const updatedCar = {
        ...cars[carIndex],
        ...req.body,
        id // Keep the same ID
    };

    cars[carIndex] = updatedCar;
    res.json(updatedCar);
});

// Delete a car
router.delete('/:id', (req, res) => {
    res.send('Delete car');
});

// Mount the router at /api/v1/cars
app.use('/api/v1/cars', router);

app.get('/', (req, res) => {
    res.send('Hello from the Cars API!');
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));