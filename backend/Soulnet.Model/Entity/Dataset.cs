using System;

namespace Soulnet.Model.Entity
{
    public class Dataset : IEntityBase
    {
        public Guid Id { get; set; }
        public string Version { get; set; }
        public string Name { get; set; }
        public bool IsLoaded { get; set; }
        public string Description { get; set; }
    }
}