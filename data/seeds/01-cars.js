exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: 98765432,
          make: "Volkswagen",
          model: "GTI",
          mileage: 150000,
          transmissionType: "Manual"
        },
        {
          vin: 884567823,
          make: "Chevrolet",
          model: "Camaro",
          mileage: 238888,
          transmissionType: "Automatic"
        },
        { vin: 773929833, make: "Ford", model: "Focus", mileage: 98700 }
      ]);
    });
};
