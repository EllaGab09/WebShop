using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using WebShopDB.Models;

namespace WebShop.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        { }

        //public DbSet<Admin> Admins { get; set; }
        //public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Review> Reviews { get; set; }
        //public DbSet<Order> Orders { get; set; }
        //public DbSet<PaymentInfo> PaymentInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=aspnet-WebShop-63E27D26-4209-402A-8E69-D8FA243037D3;Trusted_Connection=True;MultipleActiveResultSets=true");
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; Database = WebShop;");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Using Fluent below

            //Adding some example properties to Category, product and review
            modelBuilder.Entity<Category>().HasKey(t => new { t.ID });
            modelBuilder.Entity<Category>().Property(t => t.Name).IsRequired();
            modelBuilder.Entity<Category>().Property(t => t.Name).HasMaxLength(100);
            modelBuilder.Entity<Category>().Property(t => t.Name).HasColumnName("Category name");
            modelBuilder.Entity<Product>().HasKey(t => new { t.ID });
            modelBuilder.Entity<Product>().Property(t => t.Name).IsRequired();
            modelBuilder.Entity<Product>().Property(t => t.Name).HasMaxLength(100);
            modelBuilder.Entity<Product>().Property(t => t.Name).HasColumnName("Product name");
            modelBuilder.Entity<Review>().HasKey(t => new { t.ID });
            modelBuilder.Entity<Review>().Property(t => t.Author).IsRequired();
            modelBuilder.Entity<Review>().Property(t => t.Author).HasMaxLength(100);
            modelBuilder.Entity<Review>().Property(t => t.Author).HasColumnName("Author name");

            //Relations between Category and Product
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Products) //A Catheogy has many products
                .WithOne(p => p.Category) //A Product has one category
                .HasForeignKey(p => p.CategoryIdFK); //Every product has a Foreign key pointing at Category primary key.

            //Relations between Product and review
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Product) //A Review has one product
                .WithMany(r => r.Reviews) //A Product has many reviews
                .HasForeignKey(r => r.ProductIdFK); //Every Review has a Foreign key pointing at Category primary key.



            //Seeding some data to play around with in the future.

            modelBuilder.Entity<Product>().HasData(new Product { ID = 1, Name = "Mini-Keyboard", CategoryIdFK = 1 });
            modelBuilder.Entity<Product>().HasData(new Product { ID = 2, Name = "Gaming-keyboard", CategoryIdFK = 1 });
            modelBuilder.Entity<Product>().HasData(new Product { ID = 3, Name = "LG 23' HD", CategoryIdFK = 2 });
            modelBuilder.Entity<Product>().HasData(new Product { ID = 4, Name = "Siemens 28' 4K", CategoryIdFK = 2 });

            modelBuilder.Entity<Category>().HasData(new Category { ID = 1, Name = "Keyboards" });
            modelBuilder.Entity<Category>().HasData(new Category { ID = 2, Name = "Monitors" });

            modelBuilder.Entity<Review>().HasData(new Review { ID = 1, Author = "1337 gamer", Text = "Kickass keyboard, solid buy", ProductIdFK = 2 });
            modelBuilder.Entity<Review>().HasData(new Review { ID = 2, Author = "1337 gamer", Text = "Works as a second monitor", ProductIdFK = 3 });
            modelBuilder.Entity<Review>().HasData(new Review { ID = 3, Author = "1337 gamer", Text = "Loads of dead pixels :(", ProductIdFK = 4 });
            modelBuilder.Entity<Review>().HasData(new Review { ID = 4, Author = "Mamma Berit", Text = "Quick delivery, almost to big", ProductIdFK = 4 });


            //Note1: in one to one relations the syntax is slightly different, also we can choose where to place the ForeighKey in one.to.on relations.
            //Note2: in many to many relations we need a inbetweenTable.
            //Hopfully code below can be of help.





            //FROM EARLIER EF ASSIGNMENT
            //Sätter PK mm.
            //modelBuilder.Entity<Teacher>().HasKey(t => new { t.TeacherId });
            //modelBuilder.Entity<Teacher>().Property(t => t.TeacherName).IsRequired();
            //modelBuilder.Entity<Teacher>().Property(t => t.TeacherName).HasMaxLength(100);
            //modelBuilder.Entity<Teacher>().Property(t => t.TeacherName).HasColumnName("Teacher name");

            //Sätter PK mm.
            //modelBuilder.Entity<Assignment>().HasKey(a => new { a.AssignmentId });
            //modelBuilder.Entity<Assignment>().Property(a => a.AssignmentName).IsRequired();
            //modelBuilder.Entity<Assignment>().Property(a => a.AssignmentName).HasMaxLength(100);
            //modelBuilder.Entity<Assignment>().Property(a => a.AssignmentName).HasColumnName("Assignment name");

            //modelBuilder.Entity<Course>().HasKey(c => new { c.CourseId });
            //modelBuilder.Entity<Course>().Property(c => c.CourseName).IsRequired();
            //modelBuilder.Entity<Course>().Property(c => c.CourseName).HasMaxLength(100);
            //modelBuilder.Entity<Course>().Property(c => c.CourseName).HasColumnName("Course name");
            //modelBuilder.Entity<Course>()
            //    .HasOne(c => c.MyTeacher)
            //    .WithOne(t => t.MyCourse)
            //    .HasForeignKey<Teacher>(t => t.MyCourseIdFK); //Notering. I en-till-en, kan jag välja pos på FK

            //modelBuilder.Entity<Course>()
            //    .HasMany(a => a.MyAssignments)
            //    .WithOne(a => a.MyCourse)
            //    .HasForeignKey(t => t.MyCourseIdFK); //Notring. om det är en-till-many, så måste FK ligga i "many" duh

            //modelBuilder.Entity<Student>().HasKey(s => new { s.StudentId });
            //modelBuilder.Entity<Student>().Property(s => s.StudentName).IsRequired();
            //modelBuilder.Entity<Student>().Property(s => s.StudentName).HasMaxLength(100);
            //modelBuilder.Entity<Student>().Property(s => s.StudentName).HasColumnName("Student name");

            //modelBuilder.Entity<StudentCourse>().HasKey(sc => new { sc.StudentCourseId });
            //modelBuilder.Entity<StudentCourse>().Property(sc => sc.StudentCourseName).IsRequired();
            //modelBuilder.Entity<StudentCourse>().Property(sc => sc.StudentCourseName).HasMaxLength(100);
            //modelBuilder.Entity<StudentCourse>().Property(sc => sc.StudentCourseName).HasColumnName("Student name");

            //modelBuilder.Entity<StudentCourse>()
            //    .HasOne(sc => sc.MyStudent)
            //    .WithMany(s => s.MyStudentCourses)
            //    .HasForeignKey(sc => sc.MyStudentIdFK); //Notring. om det är en-till-many, så måste FK ligga i "many" duh

            //modelBuilder.Entity<StudentCourse>()
            //    .HasOne(sc => sc.MyCourse)
            //    .WithMany(c => c.MyStudentCourses)
            //    .HasForeignKey(sc => sc.MyCourseIdFK); //Notring. om det är many, så måste FK ligga i "many" duh

            //Lägger in dummy data om data saknas
            //modelBuilder.Entity<Teacher>().HasData(new Teacher { TeacherId = 1, TeacherName = "Horus", MyCourseIdFK = 1 });
            //modelBuilder.Entity<Teacher>().HasData(new Teacher { TeacherId = 2, TeacherName = "Angron", MyCourseIdFK = 2 });
            //modelBuilder.Entity<Teacher>().HasData(new Teacher { TeacherId = 3, TeacherName = "Mortarion", MyCourseIdFK = 3 });
            //modelBuilder.Entity<Teacher>().HasData(new Teacher { TeacherId = 4, TeacherName = "Lorgar", MyCourseIdFK = 4 });

            //modelBuilder.Entity<Course>().HasData(new Course { CourseId = 1, CourseName = ".NET" });
            //modelBuilder.Entity<Course>().HasData(new Course { CourseId = 2, CourseName = "Blazor" });
            //modelBuilder.Entity<Course>().HasData(new Course { CourseId = 3, CourseName = "Dapper" });
            //modelBuilder.Entity<Course>().HasData(new Course { CourseId = 4, CourseName = "EF" });

            //modelBuilder.Entity<Assignment>().HasData(new Assignment { AssignmentId = 1, AssignmentName = "Reflektion", MyCourseIdFK = 1 });
            //modelBuilder.Entity<Assignment>().HasData(new Assignment { AssignmentId = 2, AssignmentName = "Arv", MyCourseIdFK = 1 });
            //modelBuilder.Entity<Assignment>().HasData(new Assignment { AssignmentId = 3, AssignmentName = "Tasks", MyCourseIdFK = 1 });
            //modelBuilder.Entity<Assignment>().HasData(new Assignment { AssignmentId = 4, AssignmentName = "Binding", MyCourseIdFK = 2 });
            //modelBuilder.Entity<Assignment>().HasData(new Assignment { AssignmentId = 5, AssignmentName = "SignalR", MyCourseIdFK = 2 });
            //modelBuilder.Entity<Assignment>().HasData(new Assignment { AssignmentId = 6, AssignmentName = "StoredProcedures", MyCourseIdFK = 3 });
            //modelBuilder.Entity<Assignment>().HasData(new Assignment { AssignmentId = 7, AssignmentName = "InParams", MyCourseIdFK = 3 });
            //modelBuilder.Entity<Assignment>().HasData(new Assignment { AssignmentId = 8, AssignmentName = "Fluent", MyCourseIdFK = 4 });

            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 1, StudentName = "Babba" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 1, MyCourseIdFK = 1, MyStudentIdFK = 1 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 2, StudentName = "Bibbi" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 2, MyCourseIdFK = 1, MyStudentIdFK = 2 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 3, StudentName = "Bobbo" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 3, MyCourseIdFK = 1, MyStudentIdFK = 3 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 4, StudentName = "Dadda" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 4, MyCourseIdFK = 1, MyStudentIdFK = 4 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 5, StudentName = "Diddi" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 5, MyCourseIdFK = 2, MyStudentIdFK = 5 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 6, StudentName = "Doddo" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 6, MyCourseIdFK = 2, MyStudentIdFK = 6 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 7, StudentName = "Gagga" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 7, MyCourseIdFK = 2, MyStudentIdFK = 7 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 8, StudentName = "Giggi" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 8, MyCourseIdFK = 3, MyStudentIdFK = 8 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 9, StudentName = "Goggo" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 9, MyCourseIdFK = 3, MyStudentIdFK = 9 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 10, StudentName = "Sissi" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 10, MyCourseIdFK = 3, MyStudentIdFK = 10 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 11, StudentName = "Vovvo" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 11, MyCourseIdFK = 3, MyStudentIdFK = 11 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 12, StudentName = "Faffa" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 12, MyCourseIdFK = 4, MyStudentIdFK = 12 });

        }
    }
}
