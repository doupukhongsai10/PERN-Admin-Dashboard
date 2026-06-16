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
    res.send('create a new car');
});

// Update a car
router.put('/:id', (req, res) => {
    res.send('update car');
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