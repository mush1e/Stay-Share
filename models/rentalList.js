let rentals = [
  {
    "headline": "Cozy Lakefront Log Cabin",
    "numSleeps": 2,
    "numBedrooms": 1,
    "numBathrooms": 1,
    "pricePerNight": 125.99,
    "city": "Toronto",
    "province": "Ontario",
    "imageUrl": "assets/cabin1.jpg",
    "featuredRental": true
  },
  {
    "headline": "Secluded Cottage by the Lake",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 2,
    "pricePerNight": 175.50,
    "city": "Ottawa",
    "province": "Ontario",
    "imageUrl": "assets/cottage1.jpg",
    "featuredRental": false
  },
  {
    "headline": "Rustic Cabin in Algonquin Park",
    "numSleeps": 6,
    "numBedrooms": 3,
    "numBathrooms": 1,
    "pricePerNight": 99.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "assets/cabin2.jpg",
    "featuredRental": false
  },
  {
    "headline": "Luxury Lakeside Villa",
    "numSleeps": 8,
    "numBedrooms": 4,
    "numBathrooms": 3,
    "pricePerNight": 299.99,
    "city": "Toronto",
    "province": "Ontario",
    "imageUrl": "assets/villa1.jpg",
    "featuredRental": false
  },
  {
    "headline": "Lakeview Retreat",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 2,
    "pricePerNight": 150.00,
    "city": "Ottawa",
    "province": "Ontario",
    "imageUrl": "assets/retreat1.jpg",
    "featuredRental": false
  },
  {
    "headline": "Charming Cottage in Muskoka",
    "numSleeps": 6,
    "numBedrooms": 3,
    "numBathrooms": 1,
    "pricePerNight": 159.99,
    "city": "Toronto",
    "province": "Ontario",
    "imageUrl": "assets/cottage2.jpg",
    "featuredRental": false
  },
  {
    "headline": "Lakefront Paradise",
    "numSleeps": 10,
    "numBedrooms": 5,
    "numBathrooms": 3,
    "pricePerNight": 299.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "assets/paradise1.jpg",
    "featuredRental": true
  },
  {
    "headline": "Cozy Cabin by the Water",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 1,
    "pricePerNight": 129.99,
    "city": "Toronto",
    "province": "Ontario",
    "imageUrl": "assets/cabin3.jpg",
    "featuredRental": false
  },
  {
    "headline": "Scenic Lakeside Lodge",
    "numSleeps": 12,
    "numBedrooms": 6,
    "numBathrooms": 4,
    "pricePerNight": 349.99,
    "city": "Ottawa",
    "province": "Ontario",
    "imageUrl": "assets/lodge1.jpg",
    "featuredRental": false
  },
  {
    "headline": "Cottage in the Woods",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 1,
    "pricePerNight": 139.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "assets/cottage3.jpg",
    "featuredRental": false
  },
  {
    "headline": "Lakeview Retreat",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 2,
    "pricePerNight": 149.99,
    "city": "Toronto",
    "province": "Ontario",
    "imageUrl": "assets/retreat2.jpg",
    "featuredRental": false
  },
  {
    "headline": "Charming Lakeside Cabin",
    "numSleeps": 6,
    "numBedrooms": 3,
    "numBathrooms": 2,
    "pricePerNight": 169.99,
    "city": "Ottawa",
    "province": "Ontario",
    "imageUrl": "assets/cabin4.jpg",
    "featuredRental": false
  },
  {
    "headline": "Waterfront Villa",
    "numSleeps": 8,
    "numBedrooms": 4,
    "numBathrooms": 3,
    "pricePerNight": 289.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "assets/villa2.jpg",
    "featuredRental": false
  },
  {
    "headline": "Cozy Lakefront Retreat",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 1,
    "pricePerNight": 135.99,
    "city": "Toronto",
    "province": "Ontario",
    "imageUrl": "assets/retreat3.jpg",
    "featuredRental": false
  },
  {
    "headline": "Rustic Lakeside Cabin",
    "numSleeps": 6,
    "numBedrooms": 3,
    "numBathrooms": 1,
    "pricePerNight": 109.99,
    "city": "Ottawa",
    "province": "Ontario",
    "imageUrl": "assets/cabin5.jpg",
    "featuredRental": false
  },
  {
    "headline": "Lakefront Hideaway",
    "numSleeps": 8,
    "numBedrooms": 4,
    "numBathrooms": 2,
    "pricePerNight": 249.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "assets/hideaway1.jpg",
    "featuredRental": true
  },
  {
    "headline": "Modern Lakeside Cottage",
    "numSleeps": 6,
    "numBedrooms": 3,
    "numBathrooms": 2,
    "pricePerNight": 189.99,
    "city": "Toronto",
    "province": "Ontario",
    "imageUrl": "assets/cottage4.jpg",
    "featuredRental": false
  },
  {
    "headline": "Tranquil Lakeview Cabin",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 1,
    "pricePerNight": 129.99,
    "city": "Ottawa",
    "province": "Ontario",
    "imageUrl": "assets/cabin6.jpg",
    "featuredRental": false
  },
  {
    "headline": "Lakefront Retreat",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 2,
    "pricePerNight": 159.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "assets/retreat4.jpg",
    "featuredRental": false
  }
];

module.exports.getFeaturedRentals = () => {
  const featuredRentals = rentals.filter(rental => rental.featuredRental === true);
  return featuredRentals;
};

module.exports.getRentalsByCityAndProvince = () => {
  let filtered = [];

};

console.log(getRentalsByCityAndProvince().rentals[1]);
