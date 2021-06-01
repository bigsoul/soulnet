using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Soulnet.Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Soulnet.Data.Repositories;
using Newtonsoft.Json;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class DatasetsController : ControllerBase
    {
        private DatasetRepository datasetRepository;
        
        public DatasetsController(DatasetRepository datasetRepository)
        {
            this.datasetRepository = datasetRepository;
        }

        [HttpGet]
        public ActionResult<TreeResultViewModel<DatasetViewModel>> Get(int dataOffset, int dataLimit, string filter)
        {
            var _filter = JsonConvert.DeserializeObject<DatasetFilter>(filter);

            var section = datasetRepository.ReadSection(dataOffset, dataLimit, _filter);

            var result = new List<DatasetViewModel>();

            foreach(var item in section.List) {
                result.Add(new DatasetViewModel() {
                    Id = item.Id.ToString(),
                    Name = item.Name,
                    IsLoaded = item.IsLoaded
                });  
            }

            return Ok(new TreeResultViewModel<DatasetViewModel> {
                DataOffset = section.DataOffset,
                DataLimit = section.DataLimit,
                List = result
            });
        }
    } 
}