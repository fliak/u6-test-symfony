INSERT INTO `menu` (`id`, `title`, `parent_id`)
VALUES
  (1, 'Home', null),
  (2, 'Categories', null),
  (3, 'Services', null),
  (4, 'Locations', null),

  (5, 'Engines', 2),
  (6, 'Suspension', 2),
  (7, 'Exaust', 2),
  (8, 'Wheels', 2),

  (9, 'Maintenance', 3),
  (10, 'Repair', 3),

  (11, 'Main office', 4),
  (12, 'Nearby', 4),

  (13, 'Steel', 8),
  (14, 'Light-alloy', 8),
  (15, 'Forged', 8)
;