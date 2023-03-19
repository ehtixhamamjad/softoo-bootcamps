const License = require('../models/license');

const licenseController = {
    enterCar: async (req, res) => {
        try {
            console.log(req.body);
            let { numberPlate, entryLocation} = req.body;

            if (!numberPlate || !entryLocation) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'kindly fill empty blanks',
                })
            }

            req.body.exitLocation = '';
            req.body.toll = 20;
            const car = new License(req.body);

           const savedData =  await car.save();
            res.status(201).json({
                status: 'successful',
                savedData
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    exitCar: async (req, res) => {
        try {

            const car = await License.findOne({ numberPlate: req.params.noPlate });
            const { exitLocation, distance } = req.body;

            if (!car) {
                return res.status(404).json({
                    stauts: 'failed',
                    message: `seams like did'nt enter data at enterance`
                })
            }

            if (!distance || !exitLocation) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'kindly fill all empty fileds',
                });
            };

            // tax and toll calculations
            const distanceRate = 0.2;
            let toll = 20 + (distanceRate * distance);
            
            // special day discount and 
            let date = new Date();
            let dayOfWeek = date.getDay();
            const monthName = ['january', 'feburary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'octbor', 'november', 'december'];
            let monthOfYear = date.getMonth();
            let today = date.getDate();
            let month = monthName[monthOfYear];
            let monthDate = today + month;

            // weekend double charges
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                toll *= 1.5;
            }

            // special day discount
            const isDiscountDay = ['14august', '6september', '23march'];
            let discount = 0;
            if (isDiscountDay[monthDate]) {
                switch (monthDate) {
                    case '14august':
                        discount = 14;
                        break;
                    case '6september':
                        discount = 6;
                        break;
                    case '23march':
                        discount = 23;
                        break;
                    default:
                        break;
                }
            }
            if (discount > 0) {
                toll = toll * (100 - discount) / 100;
            }
            
            car.exitLocation = exitLocation;
            car.toll = toll;
            car.save();
            res.status(20===0).json({
                status: 'success',
                car,
            })
        } catch (error) {
            console.log(error.message)
        }
    },
    getCar: async (req, res) => {
        try {
            const car = await License.find({numberPlate: req.params.noPlate});
            res.status(200).json({
                status: 'success',
                car,
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            })
        }
    },
}

module.exports = licenseController;