# pgAdmin Database Management Setup

pgAdmin is a web-based PostgreSQL administration and development platform. It's included in our Docker setup to provide a visual interface for managing your Kale Payload database.

## Access Information

- **pgAdmin URL**: http://localhost:8080
- **Login Email**: admin@kale.com
- **Login Password**: admin123

## Initial Database Connection Setup

After logging into pgAdmin, you need to add a connection to your PostgreSQL database:

1. **Open pgAdmin** at http://localhost:8080
2. **Login** with the credentials above
3. **Add New Server**:
   - Right-click on "Servers" → "Register" → "Server..."

4. **General Tab**:
   - Name: `Kale Payload Database`

5. **Connection Tab**:
   - Host: `postgres`
   - Port: `5432`
   - Maintenance database: `kale_payload_db`
   - Username: `kale_user`
   - Password: `kale_password`

6. **Click Save**

## What You Can Do

Once connected, you can:

- **View Database Structure**: Browse tables, columns, indexes
- **Run SQL Queries**: Execute custom SQL queries
- **Manage Data**: View, insert, update, delete records
- **Monitor Performance**: Check query execution plans
- **Database Administration**: Backup, restore, user management

## Payload CMS Tables

Your Kale Payload application creates these main tables:

- `users` - User accounts and authentication
- `users_roles` - User role relationships
- `users_sessions` - Active user sessions
- `media` - File uploads and media management
- `website_settings` - Global website configuration
- `general_contents` - General content management
- `payload_*` - System tables for Payload CMS functionality

## Docker Commands

- **Start pgAdmin**: `docker-compose up -d pgadmin`
- **Stop pgAdmin**: `docker-compose stop pgadmin`
- **Restart pgAdmin**: `docker-compose restart pgadmin`
- **View Logs**: `docker-compose logs pgadmin`

## Troubleshooting

- **Can't access pgAdmin**: Check if port 8080 is available
- **Connection failed**: Ensure PostgreSQL service is running (`docker-compose up -d postgres`)
- **Wrong credentials**: Use the login info provided above
- **Container not starting**: Check Docker logs with `docker-compose logs pgladmin`

## Security Note

This setup is for development only. For production:
- Change default passwords
- Use environment variables for credentials  
- Configure proper network security
- Enable SSL/TLS connections