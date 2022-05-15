SELECT movies.movie_name AS employees, reviews.review
FROM employee
LEFT JOIN department
ON role.department_id = department.id
ORDER BY department.department_id;