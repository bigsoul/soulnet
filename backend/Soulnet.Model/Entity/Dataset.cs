namespace Soulnet.Model.Entity
{
    public class Dataset : IEntityBase
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsLoaded { get; set; }
    }
}