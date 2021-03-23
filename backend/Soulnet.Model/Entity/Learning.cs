namespace Soulnet.Model.Entity
{
    public class Learning : IEntityBase
    {
        public string Id { get; set; }
        public int State { get; set; }
        public bool IsArchive { get; set; }
        public int IterationCount { get; set; }
        public int IterationCurrent { get; set; }
        public int InputNeuronsCount { get; set; }
        public int DeepLayersCount { get; set; }
        public int DatasetId { get; set; }
    }
}