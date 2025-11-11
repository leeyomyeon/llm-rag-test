import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


conn = sqlite3.connect(BASE_DIR + '/test.db')
cursor = conn.cursor()

def create_table():
  sql_command = """
  CREATE TABLE TEST (
    ID INTEGER PRIMARY KEY,
    PRODUCT VARCHAR(20),
    PRICE INT
  )
  """
  cursor.execute(sql_command)

def insert_data():
  cursor.execute("INSERT INTO TEST (PRODUCT, PRICE) VALUES ('Apple', 1000)")
  cursor.execute("INSERT INTO TEST (PRODUCT, PRICE) VALUES ('Banana', 500)")
  conn.commit()

def fetch_data():
  cursor.execute("SELECT * FROM TEST")
  results = cursor.fetchall()
  for row in results:
    print(row)

command = int(input("Insert data(1), Select Data(2) : "))
if command == 1:
  insert_data()
if command == 2:
  fetch_data()

conn.close()