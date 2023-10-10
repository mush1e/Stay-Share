let rentals = [
   {
    "headline": "Charming Cottage",
    "numSleeps": 6,
    "numBedrooms": 3,
    "numBathrooms": 1,
    "pricePerNight": 159.99,
    "city": "Toronto",
    "province": "Ontario",
    "imageUrl": "/img/charming-cottage.jpg",
    "featuredRental": true
  },
  {
    "headline": "Rustic Cabin",
    "numSleeps": 6,
    "numBedrooms": 3,
    "numBathrooms": 1,
    "pricePerNight": 99.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "/img/rustic-cabin.jpg",
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
    "imageUrl": "/img/lakefront-paradise.jpg",
    "featuredRental": true
  },
  {
    "headline": "Scenic Lakeside Lodge",
    "numSleeps": 12,
    "numBedrooms": 6,
    "numBathrooms": 4,
    "pricePerNight": 349.99,
    "city": "Ottawa",
    "province": "Ontario",
    "imageUrl": "/img/scenic-lakeside-lodge.jpg",
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
    "imageUrl": "/img/lakeview-retreat.jpg",
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
    "imageUrl": "/img/cozy-lakefront-retreat.jpg",
    "featuredRental": true
  },
  {
    "headline": "Lakefront Hideaway",
    "numSleeps": 8,
    "numBedrooms": 4,
    "numBathrooms": 2,
    "pricePerNight": 249.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "/img/lakefront-hideaway.jpg",
    "featuredRental": false
  },
  {
    "headline": "Highrise apartment",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 1,
    "pricePerNight": 129.99,
    "city": "Ottawa",
    "province": "Ontario",
    "imageUrl": "/img/highrise-apartment.jpg",
    "featuredRental": false
  },
  {
    "headline": "Forest Lodge",
    "numSleeps": 4,
    "numBedrooms": 2,
    "numBathrooms": 2,
    "pricePerNight": 159.99,
    "city": "Hamilton",
    "province": "Ontario",
    "imageUrl": "/img/forest-lodge.jpg",
    "featuredRental": true
  }
];

module.exports.getFeaturedRentals = () => {
  const featuredRentals = rentals.filter(rental => rental.featuredRental === true);
  return featuredRentals;
};

module.exports.getRentalsByCityAndProvince = () => {
  const groupedRentals = {};

  rentals.forEach(rental => {
    const cityProvince = `${rental.city}, ${rental.province}`;

    if (!groupedRentals[cityProvince]) {
      groupedRentals[cityProvince] = {
        cityProvince: cityProvince,
        rentals: []
      };
    }

    groupedRentals[cityProvince].rentals.push(rental);
  });

  const result = Object.values(groupedRentals);
  return result;
};
