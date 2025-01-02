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

def add_column(cursor, table_name, column_name, column_definition, default_value=None):
    query = f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_definition}"
    if default_value is not None:
        query += f" DEFAULT '{default_value}'"
    query += ";"
    cursor.execute(query)

def main():
    try:
        # Conectar a la base de datos
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        # Quitar Foreign Keys
        print(f"Eliminando foreign keys")
        remove_foreign_key(cursor, "clientes", "clientes_ibfk_1")
        remove_foreign_key(cursor, "clientes", "clientes_ibfk_2")
        remove_foreign_key(cursor, "localidades", "localidades_ibfk_1")
        remove_foreign_key(cursor, "ordenes", "ordenes_ibfk_1")
        remove_foreign_key(cursor, "ordenes", "ordenes_ibfk_2")
        remove_foreign_key(cursor, "ordenes", "ordenes_ibfk_3")
        remove_foreign_key(cursor, "ordenes", "ordenes_ibfk_4")
        remove_foreign_key(cursor, "usuarios", "usuarios_ibfk_1")

        print()
        print("Eliminando indices")
        rename_index(cursor, "usuarios", "IdCliente", "ind_user_client_id", "IdCliente", False)
        rename_index(cursor, "usuarios", "IdPerfil", "ind_user_profile_id", "IdPerfil", False)
        rename_index(cursor, "usuarios", "Usuario", "ind_user_username", "Usuario", True)
        rename_index(cursor, "clientes", "RazonSocial", "ind_client_business_name", "RazonSocial", True)
        rename_index(cursor, "clientes", "IdLocalidad", "ind_client_location_id", "IdLocalidad", False)
        rename_index(cursor, "clientes", "IdGrupo", "ind_client_group_id", "IdGrupo", False)
        rename_index(cursor, "gruposclientes", "Nombre", "ind_client_group_name", "Nombre", True)
        rename_index(cursor, "localidades", "Nombre", "ind_location_name", "Nombre", True)
        rename_index(cursor, "localidades", "IdPcia", "ind_location_province_id", "IdPcia", False)
        rename_index(cursor, "ordenes", "IdCliente_2", "ind_orders_client_id", "IdCliente", False)
        rename_index(cursor, "ordenes", "IdEstado", "ind_orders_status_id", "IdEstado", False)
        rename_index(cursor, "ordenes", "IdUsrAgente", "ind_orders_agent_user_id", "IdUsrAgente", False)
        rename_index(cursor, "ordenes", "IdUsrAutorizante", "ind_orders_authorizer_user_id", "IdUsrAutorizante", False)
        rename_index(cursor, "ordenes", "IdUsrSolicitante", "ind_orders_applicant_user_id", "IdUsrSolicitante", False)
        rename_index(cursor, "pasajeros", "IdCliente", "ind_passenger_client_id", "IdCliente", False)
        rename_index(cursor, "perfiles", "Nombre", "ind_profile_name", "Nombre", True)
        rename_index(cursor, "provincias", "Nombre", "ind_province_name", "Nombre", True)

        print()

        # Clientes
        print("Renombrando tabla clientes")
        rename_table(cursor, "clientes", "client")
        rename_column(cursor, "client", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "client", "RazonSocial", "business_name", "CHAR(50)")
        rename_column(cursor, "client", "CodTalonario", "book_code", "CHAR(10)", True)
        make_null_empty_strings(cursor, "client", "book_code")
        rename_column(cursor, "client", "CUIT", "cuit", "CHAR(15)", True)
        make_null_empty_strings(cursor, "client", "cuit")
        rename_column(cursor, "client", "Direccion", "address", "CHAR(50)", True)
        make_null_empty_strings(cursor, "client", "address")
        rename_column(cursor, "client", "IdLocalidad", "location_id", "INTEGER DEFAULT 1")
        rename_column(cursor, "client", "Provincia", "province", "CHAR(30)", True)
        make_null_empty_strings(cursor, "client", "province")
        rename_column(cursor, "client", "CP", "postal_code", "CHAR(15)", True)
        make_null_empty_strings(cursor, "client", "postal_code")
        rename_column(cursor, "client", "Telefonos", "phones", "CHAR(50)", True)
        make_null_empty_strings(cursor, "client", "phones")
        rename_column(cursor, "client", "Icono", "icon", "CHAR(50)", True)
        make_null_empty_strings(cursor, "client", "icon")
        rename_column(cursor, "client", "ProxNroTalonario", "next_book_code", "INTEGER DEFAULT 0")
        rename_column(cursor, "client", "Accion", "action", "CHAR(3)", True)
        make_null_empty_strings(cursor, "client", "action")
        rename_column(cursor, "client", "Inmediato", "immediate", "CHAR", True)
        make_null_empty_strings(cursor, "client", "immediate")
        rename_column(cursor, "client", "IdGrupo", "group_id", "INTEGER")
        rename_column(cursor, "client", "MailAuto", "mail_auto", "TINYINT")

        # Empresas
        print()
        print("Renombrando tabla empresa")
        rename_table(cursor, "empresa", "company")
        rename_column(cursor, "company", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "company", "RazonSocial", "business_name", "CHAR(50)")
        rename_column(cursor, "company", "Cuit", "cuit", "CHAR(15)")
        rename_column(cursor, "company", "EMail", "email", "CHAR(150)")
        rename_column(cursor, "company", "EMailNotif", "email_notification", "CHAR(60)")
        rename_column(cursor, "company", "EMailFrom", "email_from", "CHAR(50)")

        # Estados
        print()
        print("Renombrando tabla estados")
        rename_table(cursor, "estados", "status")
        rename_column(cursor, "status", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "status", "Nombre", "name", "CHAR(30)")

        # Grupos clientes
        print()
        print("Renombrando tabla gruposclientes")
        rename_table(cursor, "gruposclientes", "client_group")
        rename_column(cursor, "client_group", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "client_group", "Nombre", "name", "CHAR(50)")

        # Localidades
        print()
        print("Renombrando tabla localidades")
        rename_table(cursor, "localidades", "location")
        rename_column(cursor, "location", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "location", "Nombre", "name", "CHAR(50)")
        rename_column(cursor, "location", "CP", "postal_code", "CHAR(15)", True)
        make_null_empty_strings(cursor, "location", "postal_code")
        rename_column(cursor, "location", "IdPcia", "province_id", "INTEGER DEFAULT 1")

        # Ordenes
        print()
        print("Renombrando tabla ordenes")
        rename_table(cursor, "ordenes", "orders")
        rename_column(cursor, "orders", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "orders", "IdCliente", "client_id", "INTEGER")
        rename_column(cursor, "orders", "Numero", "number", "INTEGER")
        rename_column(cursor, "orders", "FechaAlta", "registration_date", "DATE")
        rename_column(cursor, "orders", "Observaciones", "observations", "TEXT", True)
        make_null_empty_strings(cursor, "orders", "observations")
        rename_column(cursor, "orders", "Derivacion", "derivations", "INTEGER DEFAULT 0")
        rename_column(cursor, "orders", "IdEstado", "status_id", "INTEGER DEFAULT 1")
        rename_column(cursor, "orders", "IdUsrSolicitante", "applicant_user_id", "INTEGER DEFAULT 1")
        rename_column(cursor, "orders", "IdUsrAutorizante", "authorizer_user_id", "INTEGER DEFAULT 1")
        rename_column(cursor, "orders", "IdUsrAgente", "agent_user_id", "INTEGER DEFAULT 1")
        rename_column(cursor, "orders", "FechaAutorizacion", "authorize_date", "DATE DEFAULT '0000-00-00'", True)
        rename_column(cursor, "orders", "FechaCierre", "target_date", "DATE DEFAULT '0000-00-00'", True)
        rename_column(cursor, "orders", "Empresas", "companies", "CHAR(70)", True)
        make_null_empty_strings(cursor, "orders", "companies")
        rename_column(cursor, "orders", "Boletos", "tickets", "CHAR(70)", True)
        make_null_empty_strings(cursor, "orders", "tickets")
        rename_column(cursor, "orders", "FechaEmision", "issue_date", "DATE DEFAULT '0000-00-00'", True)
        rename_column(cursor, "orders", "Precio", "price", "DECIMAL(10,2)")
        rename_column(cursor, "orders", "TipoPasajero", "passenger_type", "CHAR(15)")
        rename_column(cursor, "orders", "Nombre", "first_name", "CHAR(20)")
        rename_column(cursor, "orders", "Apellido", "last_name", "CHAR(20)")
        rename_column(cursor, "orders", "TipoDoc", "document_type", "CHAR(10)")
        rename_column(cursor, "orders", "Documento", "document", "CHAR(15)")
        rename_column(cursor, "orders", "Nacionalidad", "nationality", "CHAR(20)", True)
        make_null_empty_strings(cursor, "orders", "nationality")
        rename_column(cursor, "orders", "Telefonos", "phones", "CHAR(50)")
        rename_column(cursor, "orders", "FechaNac", "birthdate", "DATE", True)
        make_null_empty_date(cursor, "orders", "birthdate")
        rename_column(cursor, "orders", "TipoTransporte", "transport_type", "CHAR(15)")
        rename_column(cursor, "orders", "IdaDesde", "departure_from", "CHAR(40)", True)
        make_null_empty_strings(cursor, "orders", "departure_from")
        rename_column(cursor, "orders", "IdaHasta", "departure_to", "CHAR(40)", True)
        make_null_empty_strings(cursor, "orders", "departure_to")
        rename_column(cursor, "orders", "IdaFecha", "departure_date", "DATE", True)
        make_null_empty_date(cursor, "orders", "departure_date")
        rename_column(cursor, "orders", "IdaHora", "departure_date_hour", "CHAR(30)", True)
        make_null_empty_strings(cursor, "orders", "departure_date_hour")
        rename_column(cursor, "orders", "RegDesde", "return_from", "CHAR(40)", True)
        make_null_empty_strings(cursor, "orders", "return_from")
        rename_column(cursor, "orders", "RegHasta", "return_to", "CHAR(40)", True)
        make_null_empty_strings(cursor, "orders", "return_to")
        rename_column(cursor, "orders", "RegFecha", "return_date", "DATE", True)
        make_null_empty_date(cursor, "orders", "return_date")
        rename_column(cursor, "orders", "RegHora", "return_date_hour", "CHAR(30)", True)
        make_null_empty_strings(cursor, "orders", "return_date_hour")
        rename_column(cursor, "orders", "NroAC", "companion_number", "INTEGER")
        rename_column(cursor, "orders", "IdPadre", "father_id", "INTEGER")
        rename_column(cursor, "orders", "ObsAgente", "observation_agent", "TEXT", True)
        make_null_empty_strings(cursor, "orders", "observation_agent")
        rename_column(cursor, "orders", "NroPadre", "father_number", "INTEGER")
        rename_column(cursor, "orders", "Raiz", "root", "INTEGER")


        # Pasajeros
        print()
        print("Renombrando tabla pasajeros")
        rename_table(cursor, "pasajeros", "passenger")
        rename_column(cursor, "passenger", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "passenger", "Nombre", "first_name", "CHAR(30)")
        rename_column(cursor, "passenger", "Apellido", "last_name", "CHAR(30)")
        rename_column(cursor, "passenger", "TipoDoc", "document_type", "CHAR(10)")
        rename_column(cursor, "passenger", "Documento", "document", "CHAR(15)")
        rename_column(cursor, "passenger", "Nacionalidad", "nationality", "CHAR(30)", True)
        make_null_empty_strings(cursor, "passenger", "nationality")
        rename_column(cursor, "passenger", "Telefonos", "phones", "CHAR(50)", True)
        make_null_empty_strings(cursor, "passenger", "phones")
        rename_column(cursor, "passenger", "FechaNac", "birthdate", "DATE", True)
        make_null_empty_date(cursor, "passenger", "birthdate")
        rename_column(cursor, "passenger", "FechaAlta", "registration_date", "DATE DEFAULT '0000-00-00'")
        rename_column(cursor, "passenger", "IdCliente", "client_id", "INTEGER")


        # Perfiles
        print()
        print("Renombrando tabla perfiles")
        rename_table(cursor, "perfiles", "profile")
        rename_column(cursor, "profile", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "profile", "Nombre", "name", "CHAR(30)")
        add_profile_roles(cursor)


        # Provincias
        print()
        print("Renombrando tabla provincias")
        rename_table(cursor, "provincias", "province")
        rename_column(cursor, "province", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "province", "Nombre", "name", "CHAR(50)")

        # Usuarios
        print()
        print("Renombrando tabla usuarios")
        rename_table(cursor, "usuarios", "user")
        rename_column(cursor, "user", "Id", "id", "INTEGER auto_increment")
        rename_column(cursor, "user", "Nombre", "first_name", "CHAR(30)")
        rename_column(cursor, "user", "Apellido", "last_name", "CHAR(30)")
        rename_column(cursor, "user", "TipoDoc", "document_type", "CHAR(10)")
        rename_column(cursor, "user", "Documento", "document", "CHAR(15)", True)
        make_null_empty_strings(cursor, "user", "document")
        rename_column(cursor, "user", "EMail", "email", "CHAR(50)", True)
        make_null_empty_strings(cursor, "user", "email")
        rename_column(cursor, "user", "Telefonos", "phones", "CHAR(50)", True)
        make_null_empty_strings(cursor, "user", "phones")
        rename_column(cursor, "user", "Usuario", "username", "CHAR(20)")
        rename_column(cursor, "user", "Clave", "password", "CHAR(128)")
        rename_column(cursor, "user", "IdCliente", "client_id", "INTEGER DEFAULT 1")
        rename_column(cursor, "user", "IdPerfil", "profile_id", "INTEGER DEFAULT 1")
        rename_column(cursor, "user", "Inactivo", "inactive", "TINYINT")

        # Agregar Foreign Keys
        print()
        print(f"Agregando foreign keys")
        add_foreign_key(cursor, "client", "location_id", "location", "id")
        add_foreign_key(cursor, "client", "group_id", "client_group", "id")
        add_foreign_key(cursor, "location", "province_id", "province", "id")
        add_foreign_key(cursor, "orders", "client_id", "client", "id")
        add_foreign_key(cursor, "orders", "applicant_user_id", "user", "id")
        add_foreign_key(cursor, "orders", "authorizer_user_id", "user", "id")
        add_foreign_key(cursor, "orders", "agent_user_id", "user", "id")        
        add_foreign_key(cursor, "user", "client_id", "client", "id")        
        add_foreign_key(cursor, "user", "profile_id", "profile", "id")
        
        update_passenger_type(cursor, "Acompanante", "companion")
        update_passenger_type(cursor, "Acompañante", "companion")
        update_passenger_type(cursor, "Titular", "holder")

        update_empty_dates_to_null(cursor, "orders", "authorize_date")
        update_empty_dates_to_null(cursor, "orders", "target_date")
        update_empty_dates_to_null(cursor, "orders", "issue_date")
        add_column(cursor, "passenger", "email", "CHAR(150)", default_value="")
        add_column(cursor, "orders", "email", "CHAR(150)", default_value="")

        add_statuses(cursor)
        # Confirmar cambios
        conn.commit()

    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    main()
