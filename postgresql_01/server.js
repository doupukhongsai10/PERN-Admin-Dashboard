import express from 'express';

const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
})

let cars = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022, Price: 23000 },
    { id: 2, make: 'Tesla', model: 'Model S', year: 2023, Price: 25000 },
    { id: 3, make: 'Ford', model: 'F-150', year: 2021, Price: 24000 },
]
app.get('/', (req, res) => {
    res.send("Hello from cars API!");
});

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
    const { make, model, year, price } = req.body

    if (!make || !model || !year || !price) {
        return res.status(400).json({ error: "Missing fields" });
    }
    const newCar = {
        id: cars.length + 1,
        make: make,
        model: model,
        year: year,
        price: price
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

    const { make, model, year, price } = req.body;

    if (make) cars[carIndex].make = make;
    if (model) cars[carIndex].model = model;
    if (year) cars[carIndex].year = year;
    if (price) cars[carIndex].price = price;

    res.json(cars[carIndex]);
});

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = cars.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "car not found" });
    }

    const deleted = cars.splice(index, 1)[0];
    res.json({ message: "car deleted" });
});



app.use('/api/v1', router);
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));