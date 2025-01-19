create database todo

UPDATE todo
SET description=$1
WHERE id=$2