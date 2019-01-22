
using System;

namespace RAAP.DatabaseDeployer
{
    class Program
    {
        private const string ConnectionString = "Data Source=localhost;Integrated Security=True";
        private const string DatabaseName = "Raap";

        static void Main(string[] args)
        {
            Console.WriteLine("Running database deployer");

            new Database.Migration.Migrator().Migrate(ConnectionString, DatabaseName);

            Console.WriteLine("Completed. Press any key to continue");
            Console.ReadKey();
        }
    }
}
