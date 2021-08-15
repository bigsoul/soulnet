using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Soulnet.Model.Entity
{
    public class Learning : IEntityBase
    {
        public Guid Id { get; set; }
        public string Version { get; set; }
        public string Name { get; set; }
        public int State { get; set; }
        public bool IsArchive { get; set; }
        public int IterationCount { get; set; }
        public int IterationCurrent { get; set; }
        public int InputNeuronsCount { get; set; }
        public int DeepLayersCount { get; set; }
        public Guid DatasetId { get; set; }
        public string DatasetName { get; set; }
    }
}