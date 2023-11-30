const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  numSleeps: { type: Number, required: true },
  numBedrooms: { type: Number, required: true },
  numBathrooms: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  imageUrl: { type: String, required: true },
  featuredRental: { type: Boolean, default: false },
});

const Rental = mongoose.model('Rental', rentalSchema);
// Function to get featured rentals
Rental.getFeaturedRentals = async () => {
    try {
      const featuredRentals = await Rental.find({ featuredRental: true });
      return featuredRentals;
    } catch (error) {
      throw new Error('Error fetching featured rentals');
    }
  };
  
  // Function to get rentals grouped by city and province
  Rental.getRentalsByCityAndProvince = async () => {
    try {
      const rentals = await Rental.find();
      const groupedRentals = {};
  
      rentals.forEach(rental => {
        const cityProvince = `${rental.city}, ${rental.province}`;
  
        if (!groupedRentals[cityProvince]) {
          groupedRentals[cityProvince] = {
            cityProvince: cityProvince,
            rentals: [],
          };
        }
  
        groupedRentals[cityProvince].rentals.push(rental);
      });
  
      const result = Object.values(groupedRentals);
      return result;
    } catch (error) {
      throw new Error('Error fetching rentals by city and province');
    }
  };

module.exports = Rental;
