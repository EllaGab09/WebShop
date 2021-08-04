using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IAM.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IAM.Data
{
    public class AppIdentityDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
        {
        }

        //        protected override void OnModelCreating(ModelBuilder modelBuilder)

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Root has access to role management in IAM
            //Admin has access to everything i WebShopApp

            //Seeding AspNetRoles
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = "1", Name = "User"  });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = "2", Name = "Admin" });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = "3", Name = "Root" });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = "4", Name = "Spare1" });
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole { Id = "5", Name = "Spare2" });

            //Seeding AspNetUsers
            var hasher = new PasswordHasher<IdentityUser>(); //a hasher to hash the password before seeding the user to the db
            string tmp = "ADMIN@ADMIN.com";
            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser { Id = "1", UserName = tmp, NormalizedUserName = tmp, Email = tmp, NormalizedEmail = tmp, EmailConfirmed = true, PasswordHash = hasher.HashPassword(null, "admin") });
            tmp = "ROOT@ROOT.com";
            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser { Id = "2", UserName = tmp, NormalizedUserName = tmp, Email = tmp, NormalizedEmail = tmp, EmailConfirmed = true, PasswordHash = hasher.HashPassword(null, "root") });
            tmp = "USER@USER.com";
            modelBuilder.Entity<ApplicationUser>().HasData(new ApplicationUser { Id = "3", UserName = tmp, NormalizedUserName = tmp, Email = tmp, NormalizedEmail = tmp, EmailConfirmed = true, PasswordHash = hasher.HashPassword(null, "user") });

            //Seeding the relation between user and role to AspNetUserRoles
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "2", UserId = "1" }); //Give admin admin role
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "1", UserId = "1" }); //Give admin user role
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "3", UserId = "2" }); //Give root root role
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "1", UserId = "2" }); //Give root user role
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string> { RoleId = "1", UserId = "3" }); //Give user user role


            //"User", "Admin", "Root", "Spare1", "Spare2"

            //builder.Entity<IdentityRole>().HasData(new IdentityRole { Id = "2c5e174e-3b0e-446f-86af-483d56fd7210", Name = "Administrator", NormalizedName = "ADMINISTRATOR".ToUpper() });

        }
    }
}
