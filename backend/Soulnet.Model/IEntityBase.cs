﻿using System;

namespace Soulnet.Model
{
    public interface IEntityBase
    {
        Guid Id { get; set; }
        string Version { get; set; }
    }
}
