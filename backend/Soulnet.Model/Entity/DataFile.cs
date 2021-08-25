using System;

namespace Soulnet.Model.Entity
{
    public class DataFile : IEntityBase
    {
        public Guid Id { get; set; }
        public string Version { get; set; }
        public string Name { get; set; }
        public string Ext { get; set; }
        public int Size { get; set; }
        public int CRC32 { get; set; }
    }
}