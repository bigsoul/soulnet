using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Soulnet.Model.Entity
{
    public class MainResultReport : IEntityBase
    {
		public Guid Id { get; set; }
		public string LearningName { get; set; }
		public string TestingName { get; set; }
		public string DatasetLearningName { get; set; }
		public string DatasetTestingName { get; set; }
		public float StartDeposit { get; set; }
		public float EndDeposit { get; set; }
		public float Margin { get; set; }
	}
}