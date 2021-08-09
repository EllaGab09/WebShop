﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IAM.Models
{
    public class UserWithRoles
    {
        public string Email { get; set; }

        public List<string> Roles { get; set; }

    }
}


