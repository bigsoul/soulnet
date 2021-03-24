using System;

namespace Soulnet.Model.Entity
{
    public class Testing : IEntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int State { get; set; }
        public bool IsArchive { get; set; }
        public int IterationCount { get; set; }
        public int IterationCurrent { get; set; }
        public float StopLossPercent { get; set; }
        public float StartDeposit { get; set; }
        public float EndDeposit { get; set; }
    }
}