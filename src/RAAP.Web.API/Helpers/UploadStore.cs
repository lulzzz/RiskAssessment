using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RAAP.Web.API.Helpers
{
    public static class UploadStore
    {
        public static ConcurrentDictionary<int, UploadedImage> UserImages = new ConcurrentDictionary<int, UploadedImage>();
        public static ConcurrentDictionary<int, UploadedImage> CompanyImages = new ConcurrentDictionary<int, UploadedImage>();
    }

    public class UploadedImage
    {
        public string ContentType { get; set; }
        public byte[] Image { get; set; }
    }
}