using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebShop.Models
{
    //In order for "[FromBody]" to work in api endpoint controllers, all data must be reciecved in an object, thus we us this object.
    public class GenericObjectId
    {
            public string id { get; set; }
    }
}
