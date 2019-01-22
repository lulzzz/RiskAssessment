using System;
using System.Security.Cryptography;

namespace RAAP.Common.Security
{
    public static class Password
    {

        public static string ComputeHash(string password, string salt)
        {
            var mod4 = salt.Length % 4;
            if (mod4 > 0)
                salt += new string('=', 4 - mod4);

            var saltBytes = Convert.FromBase64String(salt);
            using (var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 1000))
                return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));
        }

        public static bool VerifyHash(string salt, string hash, string password)
        {
            return hash == ComputeHash(password, salt);
        }

        private static readonly Random Random = new Random();

        public static string CreateRandomPassword(int passwordLength)
        {
            const string allowedChars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789!@$?_-";
            var chars = new char[passwordLength];

            for (var i = 0; i < passwordLength; i++)
            {
                chars[i] = allowedChars[Random.Next(0, allowedChars.Length)];
            }

            return new string(chars);
        }

    }
}
