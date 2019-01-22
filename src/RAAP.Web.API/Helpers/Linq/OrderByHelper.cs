using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace RAAP.Web.API.Helpers.Linq
{
    public class LinqHelper
    {
        public static Func<T, object> OrderByDataContract<T>(string sortBy)
        {
            SetupCustomMapping();

            if (!string.IsNullOrEmpty(sortBy))
            {
                var customMapping = GetCustomMapping<T>(sortBy);
                if (customMapping != null)
                    return customMapping;

                var autoMapped = GetAutoMapped<T>(sortBy);
                if (autoMapped != null)
                    return autoMapped;
            }

            return GetFallback<T>();
        }

        #region Custom mapping

        private static void SetupCustomMapping()
        {
            lock (MappingLock)
            {
                if (CustomMapping.Keys.Count > 0) return;

                // User
                // AddCustomMapping<User>("CompanyName", u => u.Company.Name);

            }
        }

        #endregion

        #region OrderBy Helpers

        public static Func<T, object> BuildFuncFor<T>(string propertyName)
        {
            return t => t.GetType().InvokeMember(propertyName, BindingFlags.GetProperty, null, t, null);
        }


        private static Func<T, object> GetAutoMapped<T>(string sortBy)
        {
            var propertyInfo = GetProperty<T>(sortBy);
            if (propertyInfo == null) return null;

            return BuildFuncFor<T>(propertyInfo.Name);
        }

        private static PropertyInfo GetProperty<T>(string propertyName)
        {
            var properties = typeof(T).GetProperties();
            var property = properties.FirstOrDefault(p => p.Name.ToLower() == propertyName.ToLower());
            return property;
        }

        private static Func<T, object> GetFallback<T>()
        {
            Func<dynamic, object> fallback = x => x.Name;

            // custom fallbacks

            if (typeof(T) == typeof(Database.User))
                fallback = x => x.UserId;

            else if (typeof(T) == typeof(Database.Company))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.Asset))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.ThreatCategory))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.AssetSubCategory))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.Threat))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.Process))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.ProcessCategory))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.CriticalityCategory))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.Control))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.Incident))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.ControlCategory))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.AttributeCategory))
                fallback = x => x.Name;

            else if (typeof(T) == typeof(Database.Attribute))
                fallback = x => x.Name;
            else if (typeof(T) == typeof(Database.RiskType))
                fallback = x => x.Name;

            return fallback as Func<T, object>;
        }

        #endregion

        #region Custom mapping helpers

        private static readonly Dictionary<Type, Dictionary<string, object>> CustomMapping = new Dictionary<Type, Dictionary<string, object>>();
        private static readonly object MappingLock = new object();

        private static void AddCustomMapping<T>(string key, Func<T, object> orderBy)
        {
            if (!CustomMapping.ContainsKey(typeof(T)))
                CustomMapping.Add(typeof(T), new Dictionary<string, object>());

            var typeDictionary = CustomMapping[typeof(T)];

            if (typeDictionary.ContainsKey(key))
                throw new Exception(string.Format("The key {0} already exist in the custom mapping for {1}", key, typeof(T).Name));

            typeDictionary.Add(key, orderBy);
        }

        private static Func<T, object> GetCustomMapping<T>(string key)
        {
            if (!CustomMapping.ContainsKey(typeof(T)))
                CustomMapping.Add(typeof(T), new Dictionary<string, object>());

            var typeDictionary = CustomMapping[typeof(T)];

            if (!typeDictionary.ContainsKey(key))
                return null;

            return typeDictionary[key] as Func<T, object>;
        }


        #endregion

    }

    public static class Extensions
    {
        public static IOrderedEnumerable<TSource> OrderByDirection<TSource, TKey>(this IEnumerable<TSource> source,
                                                                                Func<TSource, TKey> keySelector,
                                                                                bool descending)
        {
            return descending
                       ? source.OrderByDescending(keySelector)
                       : source.OrderBy(keySelector);
        }
    }
}