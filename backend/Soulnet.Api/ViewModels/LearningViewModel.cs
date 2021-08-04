using System.ComponentModel.DataAnnotations;

namespace Soulnet.Api.ViewModels
{
    public class LearningViewModel
    {
        public string Id { get; set; }
        public string Version { get; set; }
        [Required]
        [StringLength(60, MinimumLength = 1)]
        public string Name { get; set; }
        public int State { get; set; }
        public bool IsArchive { get; set; }
        public int IterationCount { get; set; }
        public int IterationCurrent { get; set; }
        public int InputNeuronsCount { get; set; }
        public int DeepLayersCount { get; set; }
        public string DatasetId { get; set; }
        public string DatasetName { get; set; }
    }
}