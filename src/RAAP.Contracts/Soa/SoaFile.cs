using System;
using System.Runtime.Serialization;

namespace RAAP.Contracts.Soa
{
    [DataContract]
    public class SoaFile
    {
        public SoaFile(string fileName, int soaChapterId, Guid guid, bool template)
        {
            FileName = fileName;
            SoaChapterId = soaChapterId;
            Guid = guid;
            Template = template;
        }
        [DataMember]
        public string FileName { get; set; }

        [DataMember]
        public Guid Guid { get; set; }

        [DataMember]
        public bool Template { get; set; }

        public int SoaChapterId { get; set; }
    }
}
