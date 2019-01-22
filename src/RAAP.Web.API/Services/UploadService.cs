using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RAAP.Database;

namespace RAAP.Web.API.Services
{
    public class UploadService : ServiceBase
    {
        public UploadService(UserService userService) : base(userService)
        {
        }

        public Contracts.Soa.SoaFile AddFile(int soaChapterId, string fileName, bool masterDb = false)
        {
            fileName = Path.GetFileName(fileName);
            var dbFile = new SoaFile()
            {
                SoaChapterId = soaChapterId,
                FileName = fileName,
                Guid = Guid.NewGuid()
            };
            if (masterDb)
                using (var db = new RAAPMasterEntities())
                {
                    db.SoaFiles.Add(dbFile);
                    db.SaveChanges();
                    return dbFile.ToContract();
                }
            else
                using (var db = new RAAPEntities(GetConnectionString()))
                {
                    db.SoaFiles.Add(dbFile);
                    db.SaveChanges();
                    return dbFile.ToContract();
                }
        }

        public Contracts.Soa.SoaFile GetFile(Guid guid)
        {
            using (var db = new RAAPEntities(GetConnectionString()))
            {
                var dbFile = db.SoaFiles.FirstOrDefault(f => f.Guid == guid);
                Contracts.Soa.SoaFile file = null;
                if (dbFile == null)
                    using (var master = new RAAPMasterEntities())
                    {
                        dbFile = master.SoaFiles.FirstOrDefault(f => f.Guid == guid);
                        if (dbFile != null)
                        {
                            file = dbFile.ToContract();
                            file.Template = true;
                        }
                    }
                else
                    file = dbFile.ToContract();
                return file;
            }
        }

        public void DeleteFile(Contracts.Soa.SoaFile file)
        {
            if (file.Template)
                using (var db = new RAAPMasterEntities())
                {
                    var dbFile = db.SoaFiles.FirstOrDefault(f => f.Guid == file.Guid);
                    db.SoaFiles.Remove(dbFile);
                    db.SaveChanges();
                }
            else
                using (var db = new RAAPEntities(GetConnectionString()))
                {
                    var dbFile = db.SoaFiles.FirstOrDefault(f => f.Guid == file.Guid);
                    db.SoaFiles.Remove(dbFile);
                    db.SaveChanges();
                }
        }

        internal object GetFiles()
        {
            throw new NotImplementedException();
        }
    }

    public static class SoaFileExtensions
    {
        public static Contracts.Soa.SoaFile ToContract(this SoaFile dbFile)
        {
            return new Contracts.Soa.SoaFile(dbFile.FileName, dbFile.SoaChapterId, dbFile.Guid, false);
        }
    }
}
