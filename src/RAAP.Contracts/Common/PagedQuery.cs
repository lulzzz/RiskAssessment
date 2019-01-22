using System.Runtime.Serialization;

namespace RAAP.Contracts.Common
{
    [DataContract]
    public class PagedQuery
    {
        public PagedQuery() { }

        public PagedQuery(int pageSize, int page)
        {
            PageSize = pageSize;
            Page = page;
        }

        [DataMember]
        public int PageSize { get; set; }

        [DataMember]
        public int Page { get; set; }

        [DataMember]
        public string OrderByKey { get; set; }

        [DataMember]
        public bool IsDescending { get; set; }

        private void EnsureValidData()
        {
            if (PageSize <= 0)
                PageSize = 10;

            if (PageSize > 10000)
                PageSize = 10000;

            if (Page <= 0)
                Page = 1;

            if (Page > 100000)
                Page = 100000;
        }

        public int ItemsToSkip
        {
            get
            {
                EnsureValidData();
                return (Page - 1) * PageSize;
            }
        }

        public int CalculatePages(int totalItems)
        {
            EnsureValidData();
            return (totalItems - 1) / PageSize + 1;
        }

    }
}
