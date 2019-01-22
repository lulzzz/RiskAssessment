using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using Microsoft.AspNet.Identity.EntityFramework;
using RAAP.Contracts.Common;
using RAAP.Contracts.User;
using RAAP.Database;
using RAAP.Web.API.Helpers.Exceptions;
using RAAP.Web.API.Helpers.Linq;
using User = RAAP.Database.User;

namespace RAAP.Web.API.Services
{
    public class UserService
    {
        public IdentityUser GetIdentityUserByLogin(string username, string password)
        {
            try
            {
                using (var db = new RAAPMasterEntities())
                {
                    var user = db.Users.Include("Roles").FirstOrDefault(u => u.Username == username);
                    if (user == null)
                        return null;

                    if (
                        !Common.Security.Password.VerifyHash(user.CreatedOn.Date.Ticks.ToString(), user.PasswordHash,
                            password))
                        return null;

                    return user.Convert();
                }
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public bool IsUsernameAvailable(string username)
        {
            if (string.IsNullOrEmpty(username) || username.Length < 2)
                return false;

            using (var db = new RAAPMasterEntities())
            {
                var dbUser = db.Users.Any(u => u.Username == username);
                return !dbUser;
            }
        }
        public bool IsEmailAvailable(string email)
        {
            if (string.IsNullOrEmpty(email) || email.Length < 2)
                return false;

            using (var db = new RAAPMasterEntities())
            {
                var dbUser = db.Users.Any(u => u.Email == email);
                return !dbUser;
            }
        }

        internal void SetNewPassword(Guid newPasswordGuid, string newPassword, string newPasswordRepeat)
        {
            using (var db = new RAAPMasterEntities())
            {
                var user = db.Users.FirstOrDefault(u => u.NewPasswordGuid == newPasswordGuid);
                if (user == null)
                    throw new RAAPConflictException("Invalid password recovery id!");

                if (string.IsNullOrEmpty(newPassword) || newPassword.Length < 8)
                    throw new RAAPConflictException("Password must at least be 8 characters.");

                if (newPassword != newPasswordRepeat)
                    throw new RAAPConflictException("Passwords don't match! Please repeat your password.");

                user.NewPasswordGuid = null;
                user.PasswordHash = Common.Security.Password.ComputeHash(newPassword, user.CreatedOn.Date.Ticks.ToString());
                db.SaveChanges();
            }
        }

        public Contracts.User.User GetUserByUserId(int userId, bool includeRoles = true)
        {
            try
            {
                using (var db = new RAAPMasterEntities())
                {
                    var dbUser = db.Users.Include("Company").Include("Roles").FirstOrDefault(u => u.UserId == userId);
                    if (dbUser == null)
                        throw new RAAPNotFoundException("Item not found.");

                    return dbUser.ToContract(includeRoles);
                }
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public void UpdateProfileImage(int userId, byte[] image, string contentType)
        {
            using (var db = new RAAPMasterEntities())
            {
                var dbUser = db.Users.FirstOrDefault(u => u.UserId == userId);
                if (dbUser == null)
                    throw new RAAPNotFoundException("Item not found.");

                dbUser.ProfileImage = image;
                dbUser.ProfileImageFiletype = contentType;

                db.SaveChanges();
            }
        }

        public ProfileImage GetProfileImage(int userId)
        {
            using (var db = new RAAPMasterEntities())
            {
                var dbUser = db.Users.FirstOrDefault(u => u.UserId == userId);
                if (dbUser == null)
                    throw new RAAPNotFoundException("Item not found.");

                return new ProfileImage
                {
                    ContentType = dbUser.ProfileImageFiletype,
                    Image = dbUser.ProfileImage
                };
            }
        }

        public PagedResult<Contracts.User.User> Get(PagedQuery pagedQuery, int companyId)
        {
            using (var db = new RAAPMasterEntities())
            {
                var query = db.Users.Where(u => u.CompanyId == companyId);
                var totalItems = query.Count();

                return new PagedResult<Contracts.User.User>
                {
                    CurrentPage = pagedQuery.Page,
                    TotalItems = totalItems,
                    TotalPages = pagedQuery.CalculatePages(totalItems),
                    Items = query.AsQueryable()
                        .OrderByDirection(LinqHelper.OrderByDataContract<User>(pagedQuery.OrderByKey),
                            pagedQuery.IsDescending)
                        .Skip(pagedQuery.ItemsToSkip)
                        .Take(pagedQuery.PageSize)
                        .Select(x => x.ToContract(false))
                        .ToArray()
                };

            }
        }

        public Contracts.User.User Create(CreateUser create)
        {
            try
            {
                using (var db = new RAAPMasterEntities())
                {
                    if (db.Users.Any(a => a.Email == create.Email))
                        throw new RAAPConflictException("Email is already in use!");

                    if (db.Users.Any(a => a.Username == create.Username))
                        throw new RAAPConflictException("Username is already in use!");

                    if (string.IsNullOrEmpty(create.Password) || create.Password.Length < 4)
                        throw new RAAPConflictException("Password must at least be 4 characters.");

                    if (create.Password != create.PasswordRepeat)
                        throw new RAAPConflictException("Please repeat your password correctly.");


                    var user = create.ToDataModel(db);
                    user.PasswordHash = Common.Security.Password.ComputeHash(create.Password,
                        user.CreatedOn.Date.Ticks.ToString());

                    db.Users.Add(user);
                    db.SaveChanges();

                    // add default role to all users
                    //var sysadminRole = db.Roles.FirstOrDefault(r => r.Role1 == "SystemAdministrator");
                    //sysadminRole.Users.Add(user);
                    db.SaveChanges();

                    return db.Users.Include("Company").FirstOrDefault(u => u.UserId == user.UserId).ToContract(true);
                }
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public void SetPassword(SetPassword setPassword)
        {
            using (var db = new RAAPMasterEntities())
            {
                var dataUser = db.Users.FirstOrDefault(u => u.UserId == setPassword.UserId);
                if (dataUser == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (string.IsNullOrEmpty(setPassword.Password) || setPassword.Password.Length < 4)
                    throw new RAAPConflictException("Password must at least be 4 characters.");

                dataUser.PasswordHash = Common.Security.Password.ComputeHash(setPassword.Password, dataUser.CreatedOn.Date.Ticks.ToString());
                db.SaveChanges();
            }
        }

        public void RecoverPassword(string username)
        {
            using (var db = new RAAPMasterEntities())
            {
                var dataUser = db.Users.FirstOrDefault(u => u.Username == username);
                if (dataUser == null)
                    throw new RAAPConflictException("Invalid username!");

                dataUser.NewPasswordGuid = Guid.NewGuid();
                db.SaveChanges();

                var mailMessage = new MailMessage
                {
                    Subject = "CRMAP - Recover your password",
                    IsBodyHtml = false,
                    Body = "Hi," + Environment.NewLine + Environment.NewLine +
                           "To reset your CRMAP password, please use the following link:" + Environment.NewLine +
                           "https://www.kamude.no/WebClient/changepassword/" + dataUser.NewPasswordGuid + Environment.NewLine +
                           "" + Environment.NewLine +
                           "Best regards," + Environment.NewLine +
                           "CRMAP Team" + Environment.NewLine +
                           "https://www.kamude.no/"
                };

                mailMessage.To.Add(new MailAddress(dataUser.Email));
                var mailClient = new SmtpClient();
                mailClient.Send(mailMessage);
            }
        }

        public void ChangePassword(Contracts.User.ChangePassword changePassword)
        {
            using (var db = new RAAPMasterEntities())
            {
                var dataUser = db.Users.FirstOrDefault(u => u.UserId == changePassword.UserId);
                if (dataUser == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (!Common.Security.Password.VerifyHash(dataUser.CreatedOn.Date.Ticks.ToString(), dataUser.PasswordHash, changePassword.Password))
                    throw new RAAPConflictException("Invalid password!");

                if (changePassword.NewPassword != changePassword.NewPasswordRepeat)
                    throw new RAAPConflictException("Passwords it not matching!");

                if (string.IsNullOrEmpty(changePassword.Password) || changePassword.Password.Length < 8)
                    throw new RAAPConflictException("Password must at least be 8 characters.");

                dataUser.PasswordHash = Common.Security.Password.ComputeHash(changePassword.NewPassword, dataUser.CreatedOn.Date.Ticks.ToString());
                db.SaveChanges();
            }
        }


        public Contracts.User.User Update(Contracts.User.UpdateUser update)
        {
            using (var db = new RAAPMasterEntities())
            {
                var user = db.Users.FirstOrDefault(u => u.UserId == update.UserId);
                if (user == null)
                    throw new RAAPNotFoundException("Item not found.");

                if (db.Users.Any(a => a.Email == update.Email && a.UserId != update.UserId))
                    throw new RAAPConflictException("Email is already in use!");

                if (db.Users.Any(a => a.Username == update.Username && a.UserId != update.UserId))
                    throw new RAAPConflictException("Username is already in use!");

                user.ApplyUpdate(update);
                user.Roles.Clear();
                db.SaveChanges();

                foreach (var role in update.Roles)
                {
                    var roleToAdd = db.Roles.FirstOrDefault(r => r.Role1 == role);
                    roleToAdd.Users.Add(user);
                }

                db.SaveChanges();

                return user.ToContract(true);
            }
        }

        public void Delete(int id)
        {
            using (var db = new RAAPMasterEntities())
            {
                var user = db.Users.FirstOrDefault(a => a.UserId == id);
                if (user == null)
                    throw new RAAPNotFoundException("Item not found.");
                user.Roles.Clear();
                db.Users.Remove(user);
                db.SaveChanges();
            }
        }

        public List<Contracts.Language.Language> GetAvailableLanguages()
        {
            using (var db = new RAAPMasterEntities())
            {
                return db.Languages.OrderBy(l => l.Name).Select(l => new Contracts.Language.Language
                {
                    Name = l.Name,
                    IsoCode = l.IsoCode
                }).ToList();
            }
        }

        public List<SimpleSearchResult> Search(string query, int companyId)
        {
            using (var db = new RAAPMasterEntities())
            {
                if (companyId != 1)
                    return db.Users.Where(u => (u.FirstName.Contains(query) || u.LastName.Contains(query) ||
                          (u.FirstName + " " + u.LastName).Contains(query)) && u.CompanyId == companyId)
                            .OrderBy(a => a.LastName).ThenBy(a => a.FirstName)
                            .Take(20)
                            .Select(a => new SimpleSearchResult { Id = a.UserId, Name = a.FirstName + " " + a.LastName }).ToList();
                else
                    return db.Users.Where(u => u.FirstName.Contains(query) || u.LastName.Contains(query) ||
                       (u.FirstName + " " + u.LastName).Contains(query))
                         .OrderBy(a => a.LastName).ThenBy(a => a.FirstName)
                         .Take(20)
                         .Select(a => new SimpleSearchResult { Id = a.UserId, Name = a.FirstName + " " + a.LastName }).ToList();
            }
        }

    }

    public static class UserExtensions
    {
        public static IdentityUser Convert(this User dataUser)
        {
            var user = new IdentityUser
            {
                Id = dataUser.UserId.ToString(),
                Email = dataUser.Email,
                UserName = dataUser.FirstName + " " + dataUser.LastName,
                PasswordHash = dataUser.PasswordHash,
            };

            foreach (var role in dataUser.Roles)
            {
                user.Roles.Add(new IdentityUserRole { RoleId = role.Role1, UserId = dataUser.UserId.ToString() });
            }

            user.Claims.Add(new IdentityUserClaim { ClaimType = ClaimTypes.PrimaryGroupSid, ClaimValue = dataUser.CompanyId.ToString(), UserId = dataUser.UserId.ToString() });
            user.Claims.Add(new IdentityUserClaim() { ClaimType = ClaimTypes.System, ClaimValue = dataUser.Company.DatabaseName, UserId = dataUser.UserId.ToString() });

            return user;
        }

        public static Contracts.User.User ToContract(this User user, bool includeRoles)
        {
            if (user == null) return new Contracts.User.User();

            var roles = new string[0];
            if (includeRoles)
                roles = user.Roles.Select(r => r.Role1).ToArray();

            return new Contracts.User.User
            {
                Email = user.Email,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserId = user.UserId,
                CreatedOn = user.CreatedOn,
                UpdatedOn = user.UpdatedOn,
                Roles = roles,
                CompanyId = user.CompanyId,
                CompanyName = user.Company.Name,
                Title = user.Title,
                Phone = user.Phone,
                Department = user.Department
            };

        }

        public static User ToDataModel(this CreateUser create, RAAPMasterEntities db)
        {
            var dataModel = new User
            {
                Email = create.Email,
                CompanyId = create.CompanyId,
                FirstName = create.FirstName,
                LastName = create.LastName,
                Username = create.Username,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now,
                PasswordHash = "TODO",
                Title = create.Title,
                Phone = create.Phone,
                Department = create.Department
            };

            if (create.Roles != null)
            {
                foreach (var role in create.Roles)
                {
                    var roleToAdd = db.Roles.FirstOrDefault(r => r.Role1 == role);
                    dataModel.Roles.Add(roleToAdd);
                }

            }

            return dataModel;
        }

        public static void ApplyUpdate(this User dataItem, Contracts.User.UpdateUser update)
        {
            dataItem.FirstName = update.FirstName;
            dataItem.LastName = update.LastName;
            dataItem.CompanyId = update.CompanyId;
            dataItem.Email = update.Email;
            dataItem.Username = update.Username;
            dataItem.UpdatedOn = DateTime.Now;
            dataItem.Title = update.Title;
            dataItem.Phone = update.Phone;
            dataItem.Department = update.Department;

        }
    }
}
