using System.Collections.Generic;

namespace Soulnet.Api.ViewModels
{
    public class TreeResultViewModel<T>
    {
        public int DataOffset { get; set; }
        public int DataLimit { get; set; }
        public List<T> List { get; set; }
    }
}