using System.ComponentModel.DataAnnotations;

namespace Soulnet.Api.ViewModels
{
    public class TestingViewModel
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
		[Required]
	    public float StopLossPercent { get; set; }
		[Required]
	    public float StartDeposit { get; set; }
	    public float EndDeposit { get; set; }
		[Required]
	    public string LearningId { get; set; }
		public string LearningName { get; set; }
		[Required]
	    public string DatasetId { get; set; }
		public string DatasetName { get; set; }
    }
}