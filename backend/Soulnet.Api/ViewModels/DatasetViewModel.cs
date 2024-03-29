namespace Soulnet.Api.ViewModels
{
    public class DatasetViewModel
    {
        public string Id { get; set; }
        public string Version { get; set; }
        public string Name { get; set; }
        public bool IsLoaded { get; set; }
        public string Description { get; set; }
    }
}