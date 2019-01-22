using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;

namespace RAAP.Database.Migration
{
    public class Migrator
    {
        private const string Prefix = "RAAP.Database.Migration.Scripts.";

        public void Migrate(string connectionString, string databaseName)
        {
            EnsureDatabaseIsCreated(connectionString, databaseName);
            EnsureMigrationTableExists(connectionString, databaseName);
            EnsureDatabaseIsCreated(connectionString, "RAAPMaster");

            EnsureDirectoriesExists();

            using (var masterConnection = new SqlConnection(connectionString + ";Initial Catalog=" + databaseName + ";"))
            {
                masterConnection.Open();

                // ensure we have migration table
                //new SqlCommand(CreateMigrationTable, masterConnection).ExecuteNonQuery();

                var executedMigrations = GetMigrationListFromDb(masterConnection);
                var migrations = GetMigrationListFromProject().ToList();
                var migrationToExecute = migrations.Where(m => !executedMigrations.Contains(m.Item1)).OrderBy(m => m.Item2).ToList();
                var databases = GetListOfDatabases(masterConnection);

                Console.WriteLine("Found "+ migrationToExecute.Count +" outstanding migrations of total " + migrations.Count());

                foreach (var migration in migrationToExecute)
                {
                   
                        using (var transaction = masterConnection.BeginTransaction())
                        {
                            var sql = Load(migration.Item2);
                            Console.WriteLine("Running migration - " + migration.Item2.Replace(Prefix, ""));

                        // run migration script
                        if (migration.Item3.ToLower().StartsWith("master"))
                            new SqlCommand("use RAAPMaster;" + sql, masterConnection, transaction).ExecuteNonQuery();
                        else
                            foreach (var database in databases)
                                new SqlCommand("use " + database + ";" + sql, masterConnection, transaction).ExecuteNonQuery();

                        // update migration history table
                        new SqlCommand(
                                "if exists (select * from RAAP.sys.objects where object_id = OBJECT_ID(N'[dbo].[Migrations]') AND type in (N'U')) INSERT INTO RAAP.dbo.Migrations (MigrationId, CreatedDate) VALUES('" +
                                migration.Item1 +
                                "', GETDATE()) ELSE INSERT INTO RAAPMaster.dbo.Migrations (MigrationId, CreatedDate) VALUES('" +
                                migration.Item1 + "', GETDATE())", masterConnection, transaction).ExecuteNonQuery();

                            transaction.Commit();
                        }
                  }
                masterConnection.Close();
            }
        }

        private void EnsureMigrationTableExists(string connectionString, string databaseName)
        {
            using (var connection = new SqlConnection(connectionString + ";Initial Catalog=" + databaseName + ";"))
            {
                connection.Open();
                new SqlCommand(CreateMigrationTable, connection).ExecuteNonQuery();
                connection.Close();
            }
        }

        private List<string> GetListOfDatabases(SqlConnection masterConnection)
        {
            var command = new SqlCommand(GetDatabases, masterConnection);
            List<string> databases = new List<string>();
            using (var reader = command.ExecuteReader())
            {
                while( reader.Read())
                    databases.Add(reader.GetString(0));
            }
            return databases;
        }

        private static void EnsureDirectoriesExists()
        {
            if (!Directory.Exists(@"C:\SQL"))
                Directory.CreateDirectory(@"C:\SQL");
            if (!Directory.Exists(@"C:\SQL\Data"))
                Directory.CreateDirectory(@"C:\SQL\Data");
            if (!Directory.Exists(@"C:\SQL\Backup"))
                Directory.CreateDirectory(@"C:\SQL\Backup");
        }

        #region LoadEmbededContent

        public static string Load(string scriptName)
        {
            var resourceStream = GetResourceStream(scriptName);
            if (resourceStream == null) return string.Empty;

            using (var resourceStreamReader = new StreamReader(resourceStream))
            {
                return resourceStreamReader.ReadToEnd();
            }
        }

        private static Stream GetResourceStream(string scriptName)
        {
            return Assembly.GetExecutingAssembly().GetManifestResourceStream(scriptName);
        }

        #endregion

        private static IEnumerable<string> GetMigrationListFromDb(SqlConnection connection)
        {
            using (var cmd = new SqlCommand("if exists (select * from RAAP.sys.objects where object_id = OBJECT_ID(N'[dbo].[Migrations]') AND type in (N'U')) SELECT MigrationId FROM RAAP.dbo.Migrations else SELECT MigrationId FROM RAAPMaster.dbo.Migrations", connection))
            {
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        yield return reader["MigrationId"].ToString();
                    }
                }
            }
        }

        private static IEnumerable<Tuple<string, string, string>> GetMigrationListFromProject()
        {
            
            var allResourceNames = Assembly.GetExecutingAssembly().GetManifestResourceNames();
            var scripts = allResourceNames.Where(r => r.StartsWith(Prefix) && r.EndsWith(".sql"));

            foreach (var script in scripts)
            {
                if (script.Length < Prefix.Length + 13)
                    throw new Exception("Invalid script name - please check: " + script);

                var migrationId = script.Replace(Prefix, "").Substring(0, 13).Replace("'", "").Trim();
                var name = script.Replace(Prefix, "").Replace(migrationId, "").Replace("-", "").Trim();
                yield return new Tuple<string, string, string> (migrationId, script, name);
            }
        }

        private static void EnsureDatabaseIsCreated(string connectionString, string databaseName)
        {
            using (var connection = new SqlConnection(connectionString))
            {
                connection.Open();
                new SqlCommand(CreateDbScript.Replace("@name", databaseName), connection).ExecuteNonQuery();
                connection.Close();
            }
        }

        #region Scripts

        private const string GetDatabases = @"if NOT (EXISTS (SELECT *  FROM master.dbo.sysdatabases sd WHERE sd.name='RAAPMaster') AND EXISTS(select * from RAAPMaster.sys.tables t where t.name='Migrations')) select 'RAAP' as DatabaseName else select DatabaseName from RAAPMaster.dbo.Companies";

        private const string CreateDbScript = @"IF NOT EXISTS(SELECT * FROM sys.databases WHERE [name] = '@name')
                                                   CREATE DATABASE @name;";

        private const string CreateMigrationTable = @"IF  NOT EXISTS (SELECT * FROM sys.objects 
WHERE object_id = OBJECT_ID(N'[dbo].[Migrations]') AND type in (N'U')) AND 
NOT (EXISTS (SELECT * 
FROM master.dbo.sysdatabases sd WHERE sd.name='RAAPMaster'))
BEGIN
CREATE TABLE dbo.Migrations
	(
	MigrationId nvarchar(50) NOT NULL,
	CreatedDate datetime NOT NULL
	)  ON [PRIMARY]
ALTER TABLE dbo.Migrations ADD CONSTRAINT
	PK_Migrations PRIMARY KEY CLUSTERED 
	(
	MigrationId
	) WITH( STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
END";

        #endregion

    }
}
