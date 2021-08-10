﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Models
{
    public class Review_old
    {
        //[Key]
        public int ID { get; set; }
        //[Required]
        public string Author { get; set; }
        //[Required]
        //public string Date { get; set; }
        //[Required]
        //public float Rating { get; set; }
        public string Text { get; set; }
        //public int ProductID { get; set; }
        public Product Product { get; set; }
        public int ProductIdFK { get; set; } //FK. I think this need to be here in order to use Fluent

    }
}