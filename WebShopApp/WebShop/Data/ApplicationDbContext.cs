using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using WebShop.Models_DbSet;

namespace WebShop.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<DetailedProduct> DetailedProducts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ProductOrder> ProductOrder { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB; Database = WebShop;");
            //base.OnConfiguring(optionsBuilder); //Skum rad....
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //Adding some example properties
            modelBuilder.Entity<Product>().HasKey(p => new { p.Id });
            modelBuilder.Entity<Product>().Property(p => p.Name).IsRequired();
            modelBuilder.Entity<Product>().Property(p => p.Name).HasMaxLength(100);
            modelBuilder.Entity<Product>().Property(p => p.Name).HasColumnName("Product name");
            modelBuilder.Entity<DetailedProduct>().HasKey(dp => new { dp.Id });
            modelBuilder.Entity<Order>().HasKey(o => new { o.Id });
            modelBuilder.Entity<ProductOrder>().HasKey(po => new { po.Id });

            //Relations between DetailedProduct and Product
            modelBuilder.Entity<DetailedProduct>()
                .HasOne(p => p.Product) //A DetailedProduct has one product
                .WithOne(dp => dp.DetailedProduct) //A Product has one DetailedProduct
                .HasForeignKey<DetailedProduct>(dp => dp.ProductIdFK); //FK is placed in DetailedProduct, although in one-one relations we are free to put FK in any Model.

            //Relations between Order and Product. IE many-to-many, that is, we need an in-between-table
            modelBuilder.Entity<ProductOrder>()
                .HasOne(sc => sc.Order)
                .WithMany(s => s.ProductOrder)
                .HasForeignKey(sc => sc.OrderFK);
            modelBuilder.Entity<ProductOrder>()
                .HasOne(sc => sc.Product)
                .WithMany(c => c.ProductOrder)
                .HasForeignKey(sc => sc.ProductFK); 

            //Seeding
            modelBuilder.Entity<Product>().HasData(new Product { Id = 1, Name = "Mini-Keyboard", Price = 199, ImageUrl = "SomeURL" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 2, Name = "Gaming-keyboard", Price = 399, ImageUrl = "SomeURL" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 3, Name = "LG 23' HD", Price = 2000, ImageUrl = "SomeURL" });
            modelBuilder.Entity<Product>().HasData(new Product { Id = 4, Name = "Siemens 28' 4K", Price = 4000, ImageUrl = "SomeURL" });

            modelBuilder.Entity<DetailedProduct>().HasData(new DetailedProduct { Id = 1, Description = "Slim keyboard", ProductIdFK = 1 });
            modelBuilder.Entity<DetailedProduct>().HasData(new DetailedProduct { Id = 2, Description = "Kickass keyboard, solid buy", ProductIdFK = 2 });
            modelBuilder.Entity<DetailedProduct>().HasData(new DetailedProduct { Id = 3, Description = "Small but an exellent second monitor.", ProductIdFK = 3 });
            modelBuilder.Entity<DetailedProduct>().HasData(new DetailedProduct { Id = 4, Description = "Quick delivery, almost to big", ProductIdFK = 4 });

            //"Admin@Admin.com" bought some stuff
            modelBuilder.Entity<Order>().HasData(new Order { Id = 1, Customer = "Admin@Admin.com", TotalPrice = 2399 });
            modelBuilder.Entity<ProductOrder>().HasData(new ProductOrder { Id = 1, ProductFK = 2, OrderFK = 1 });
            modelBuilder.Entity<ProductOrder>().HasData(new ProductOrder { Id = 2, ProductFK = 3, OrderFK = 1 });

            //"Admin@Admin.com" bought some stuff again
            modelBuilder.Entity<Order>().HasData(new Order { Id = 2, Customer = "Admin@Admin.com", TotalPrice = 4000 });
            modelBuilder.Entity<ProductOrder>().HasData(new ProductOrder { Id = 3, ProductFK = 4, OrderFK = 2 });

            //root@root.com
            modelBuilder.Entity<Order>().HasData(new Order { Id = 3, Customer = "root@root.com", TotalPrice = 199 });
            modelBuilder.Entity<ProductOrder>().HasData(new ProductOrder { Id = 4, ProductFK = 1, OrderFK = 3 });






            //modelBuilder.Entity<Order>().HasData(new Order { CourseId = 2, CourseName = "Blazor" });
            //modelBuilder.Entity<Order>().HasData(new Order { CourseId = 3, CourseName = "Dapper" });
            //modelBuilder.Entity<Order>().HasData(new Order { CourseId = 4, CourseName = "EF" });


            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 1, StudentName = "Babba" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 1, MyCourseIdFK = 1, MyStudentIdFK = 1 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 2, StudentName = "Bibbi" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 2, MyCourseIdFK = 1, MyStudentIdFK = 2 });
            //modelBuilder.Entity<Student>().HasData(new Student { StudentId = 3, StudentName = "Bobbo" });
            //modelBuilder.Entity<StudentCourse>().HasData(new StudentCourse { StudentCourseId = 3, MyCourseIdFK = 1, MyStudentIdFK = 3 });


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
