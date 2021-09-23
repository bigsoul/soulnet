namespace Soulnet.Api.ViewModels
{
    public class MainResultReportViewModel
    {
		public string Id { get; set; }
		public string Version { get; set; }
		public string LearningName { get; set; }
		public string TestingName { get; set; }
		public string DatasetLearningName { get; set; }
		public string DatasetTestingName { get; set; }
		public float StartDeposit { get; set; }
		public float EndDeposit { get; set; }
		public float Margin { get; set; }
    }
}