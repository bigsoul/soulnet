using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Soulnet.Model.Entity
{
    public class Dataset : IEntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsLoaded { get; set; }
        public List<Learning> Learning { get; set; }
        public List<Testing> Testing { get; set; }
    }
}