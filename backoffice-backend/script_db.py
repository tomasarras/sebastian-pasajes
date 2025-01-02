import os
import mysql.connector
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Datos de conexión desde variables de entorno
config = {
    'user': os.getenv('DATABASE_USER'),
    'password': os.getenv('DATABASE_PASSWORD'),
    'host': os.getenv('DATABASE_HOST'),
    'database': os.getenv('DATABASE_NAME')
}

def rename_table(cursor, old_name, new_name):
    query = f"RENAME TABLE {old_name} TO {new_name};"
    cursor.execute(query)
    print(f"Tabla renombrada de {old_name} a {new_name}")

def remove_accents(cursor):
    query = f"UPDATE transport_type FROM orders SET transport_type = 'Avion' WHERE transport_type = 'Avión';"
    cursor.execute(query)

def rename_column(cursor, table_name, old_name, new_name, type, is_null = False):
    query = f"ALTER TABLE {table_name} CHANGE {old_name} {new_name} {type}"
    if (is_null):
        query = query + ";"
    else:
        query = query + " NOT NULL;"
    cursor.execute(query)
    print(f"Columna renombrada de {old_name} a {new_name} en la tabla {table_name}")

def make_null_empty_strings(cursor, table, column):
    query = f"UPDATE {table} SET {column} = NULL WHERE {column} = '';"
    cursor.execute(query)
    print(f"Valores vacios cambiados a null en la columna {column} de la tabla {table}")

def make_null_empty_date(cursor, table, column):
    query = f"UPDATE {table} SET {column} = NULL WHERE {column} = '0000-00-00';"
    cursor.execute(query)
    print(f"Valores vacios cambiados a null en la columna {column} de la tabla {table}")


def add_profile_roles(cursor): 
    query = "ALTER TABLE profile ADD COLUMN role VARCHAR(32);"
    cursor.execute(query)
    print("Columna role agregada a profile")
    cursor.execute("UPDATE profile SET role = 'ROLE_UNASSIGNED' WHERE name = '<No Asignado>';")
    cursor.execute("UPDATE profile SET role = 'ROLE_APPLICANT' WHERE name = 'Solicitante';")
    cursor.execute("UPDATE profile SET role = 'ROLE_AUTHORIZER' WHERE name = 'Autorizante';")
    cursor.execute("UPDATE profile SET role = 'ROLE_AGENT' WHERE name = 'Agente';")
    cursor.execute("UPDATE profile SET role = 'ROLE_ADMIN' WHERE name = 'Administrador';")
    cursor.execute("UPDATE profile SET role = 'ROLE_AUDITOR' WHERE name = 'Auditor';")
    print("Roles agregados")

def add_statuses(cursor): 
    query = "ALTER TABLE status ADD COLUMN reserved_name VARCHAR(32);"
    cursor.execute(query)
    print("Columna status agregada a profile")
    cursor.execute("UPDATE status SET reserved_name = 'UNASSIGNED' WHERE id = 1;")
    cursor.execute("UPDATE status SET reserved_name = 'OPEN' WHERE id = 2;")
    cursor.execute("UPDATE status SET reserved_name = 'AUTHORIZED' WHERE id = 3;")
    cursor.execute("UPDATE status SET reserved_name = 'CLOSED' WHERE id = 4;")
    cursor.execute("UPDATE status SET reserved_name = 'REJECTED' WHERE id = 5;")
    cursor.execute("UPDATE status SET reserved_name = 'CANCELLED' WHERE id = 6;")
    cursor.execute("UPDATE status SET reserved_name = 'REJECTED_FROM_OPEN' WHERE id = 7;")
    print("Estados agregados")

def remove_foreign_key(cursor, table_name, foreign_key_name):
    query = f"ALTER TABLE {table_name} DROP FOREIGN KEY {foreign_key_name};"
    cursor.execute(query)
    print(f"Restricción de clave externa eliminada {foreign_key_name} de la tabla {table_name}")

def add_foreign_key(cursor, base_table_name, base_column_name, target_table_name, target_column_name):
    query = f"ALTER TABLE {base_table_name} ADD CONSTRAINT fk_{base_table_name}_{base_column_name}_{target_table_name}_{target_column_name} FOREIGN KEY ({base_column_name}) REFERENCES {target_table_name}({target_column_name}) ON DELETE NO ACTION;"
    # print(f"QUERY={query}")
    cursor.execute(query)
    print(f"Restricción de clave externa agregada en la columna {base_column_name} de la tabla {base_table_name}")

def rename_index(cursor, table_name, old_index, new_index, column_name, is_unique):
    drop_index_query = f"ALTER TABLE {table_name} DROP INDEX {old_index};"
    cursor.execute(drop_index_query)
    if (is_unique):
        create_index_query = f"ALTER TABLE {table_name} ADD UNIQUE INDEX {new_index} ({column_name});"
    else:
        create_index_query = f"ALTER TABLE {table_name} ADD INDEX {new_index} ({column_name});"
    cursor.execute(create_index_query)
    print(f"Indice {old_index} de la tabla {table_name} renombrado por {new_index}")

def update_passenger_type(cursor, current_value, target_value):
    query = f"UPDATE orders SET passenger_type = '{target_value}' WHERE passenger_type = '{current_value}';"
    cursor.execute(query)

def update_empty_dates_to_null(cursor, table, column):
    query = f"UPDATE {table} SET {column} = null WHERE {column} = '0000-00-00';"
    cursor.execute(query)

def main():
    try:
        # Conectar a la base de datos
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        # Usuarios
        rename_column(cursor, "Usuarios", "Password", "Password", "CHAR(128)")
        sql_insert_query = "INSERT INTO perfiles (Id, Nombre) VALUES (%s, %s)"
        valores = (4, 'VENTAS ADMINISTRACION')
        cursor.execute(sql_insert_query, valores)
        # clientes parametros

        # Confirmar cambios
        conn.commit()

    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    main()
