using System;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Soulnet.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class DataFilesController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            try
            {
                int contentLength = (int)Request.ContentLength;
                int totalBytesRecived = 0;

                var buffer = new byte[contentLength];

                while(contentLength > totalBytesRecived)
                {
                    int bytesRemaining = contentLength - totalBytesRecived;                    
                    int bytesRecived = await Request.Body.ReadAsync(buffer, totalBytesRecived, bytesRemaining);

                    totalBytesRecived += bytesRecived;

                    System.Diagnostics.Trace.WriteLine("Chunk bytes resived: " + bytesRecived + " of " + bytesRemaining);
                }
                
                
                System.Diagnostics.Trace.WriteLine("Total bytes resived: " + totalBytesRecived + " of " + contentLength);
                System.Diagnostics.Trace.WriteLine("-------------------------------------------");

                return StatusCode(200);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Error. msg: {ex.Message}");
            }
        }
    }
}