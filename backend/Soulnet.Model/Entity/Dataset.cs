using System;
using System.ComponentModel.DataAnnotations;

namespace Soulnet.Model.Entity
{
    public class Dataset : IEntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsLoaded { get; set; }
        public Learning Learning { get; set; }
        public Testing Testing { get; set; }
    }
}