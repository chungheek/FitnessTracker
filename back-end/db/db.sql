CREATE TABLE exercise (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  reps INT,
  weight INT,
  unit VARCHAR(255),
  date DATETIME DEFAULT NOW(),
  PRIMARY KEY (id)
);
INSERT INTO exercise (name, reps, weight, unit)
VALUES ("bench", 10, 185, "lbs"),
  ("deadlift", 10, 300, "lbs"),
  ("rows", 5, 100, "lbs"),
  ("powerlift", 8, 150, "kg");